import React, { Component } from 'react';
import { Text, View, TextInput, Keyboard, AsyncStorage, Picker, DatePickerIOS } from 'react-native';
import styles from '@theme/styles'
import HeaderButton from '@components/HeaderButton/index';



export default class CreateListModal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {}
    };

    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: '',
            language: '',
            chosenDate: new Date(),
        }
    }

    _cancelModal() {
        const { navigation } = this.props;
        Keyboard.dismiss();
        navigation.goBack();
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 65, paddingTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <HeaderButton text={'Cancel'} onPress={() => this._cancelModal()} />
                    <HeaderButton text={'Done'} onPress={() => this._cancelModal()} />
                </View>

                <Text style={styles.title}>Add Item</Text>

                <TextInput 
                    style={styles.basicInputField}
                    onChangeText={(text) => this.setState({ itemName: text })}
                    clearButtonMode='while-editing'
                    placeholder='Name'
                    placeholderTextColor='rgba(0,0,0,0.4)'
                    value={this.state.itemName}
                    returnKeyType='next'
                    selectionColor='rgba(0,0,0,1)'
                    enablesReturnKeyAutomatically={true}
                    // onSubmitEditing={(e) => this._createNewList(e.nativeEvent.text)}
                />

                <TextInput
                    style={styles.basicInputField}
                    onChangeText={(text) => this.setState({ itemDescription: text })}
                    clearButtonMode='while-editing'
                    placeholder='Description (optional)'
                    placeholderTextColor='rgba(0,0,0,0.4)'
                    value={this.state.itemDescription}
                    returnKeyType='next'
                    selectionColor='rgba(0,0,0,1)'
                    enablesReturnKeyAutomatically={true}
                // onSubmitEditing={(e) => this._createNewList(e.nativeEvent.text)}
                />

                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="C++" value="c++" />
                    <Picker.Item label="Ruby" value="ruby" />
                    <Picker.Item label="Go" value="go" />
                    <Picker.Item label="Php" value="php" />
                </Picker>

                {/* <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={(newDate) => this.setState({ chosenDate: newDate })}
                /> */}

            </View>
        )
    }
}