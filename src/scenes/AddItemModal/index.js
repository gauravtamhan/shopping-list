import React, { Component } from 'react';
import { Text, View, TextInput, Keyboard, ScrollView, TouchableWithoutFeedback, Picker } from 'react-native';
import styles from '@theme/styles'
import HeaderButton from '@components/HeaderButton/index';
import DismissKeyboard from '@components/Utilities/dismissKeyboard';

const food_categories = [
    "Beverages",
    "Bakery",
    "Canned Goods",
    "Dairy",
    "Dry Goods",
    "Frozen Foods",
    "Meat",
    "Produce",
    "Cleaners",
    "Paper Goods",
    "Personal Care",
    "Other"
]

export default class CreateListModal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {}
    };

    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: '',
            selectedCategoryIndex: 0,
            language: '',
        }
    }

    _cancelModal() {
        const { navigation } = this.props;
        Keyboard.dismiss();
        navigation.goBack();
    }


    render() {
        const { selectedCategoryIndex } = this.state;
        return (
            <DismissKeyboard>
            <View style={styles.container}>
                <View style={{ height: 65, paddingTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <HeaderButton icon={'ios-close'} size={36} onPress={() => this._cancelModal()} />
                    <HeaderButton text={'Done'} onPress={() => this._cancelModal()} />
                </View>

                <Text style={styles.title}>Add Item</Text>
                
                <View style={{height: 40, marginVertical: 10}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.sliderWrapper}>
                            {
                                food_categories.map((item, index) => (
                                    <TouchableWithoutFeedback key={index} onPress={() => { this.setState({ selectedCategoryIndex: index }) }}>
                                        <View style={[styles.sliderPill, selectedCategoryIndex === index ? styles.sliderPillSelected : null]}>
                                            <Text style={[styles.sliderPillText, selectedCategoryIndex === index ? styles.sliderPillTextSelected : null]}>{item}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
                
                <View style={styles.inputWrapper}>
                    <TextInput 
                        style={styles.basicInputField}
                        onChangeText={(text) => this.setState({ itemName: text })}
                        clearButtonMode='while-editing'
                        placeholder='Name'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        value={this.state.itemName}
                        returnKeyType={'next'}
                        selectionColor='rgba(0,0,0,1)'
                        enablesReturnKeyAutomatically={true}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                        // onSubmitEditing={(e) => this._createNewList(e.nativeEvent.text)}
                    />
                </View>
                
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={(input) => { this.secondTextInput = input; }}
                        style={styles.basicInputField}
                        onChangeText={(text) => this.setState({ itemDescription: text })}
                        clearButtonMode='while-editing'
                        placeholder='Description (optional)'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        value={this.state.itemDescription}
                        returnKeyType={'next'}
                        selectionColor='rgba(0,0,0,1)'
                        enablesReturnKeyAutomatically={true}
                        blurOnSubmit={false}
                    // onSubmitEditing={(e) => this._createNewList(e.nativeEvent.text)}
                    />
                </View>

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

            </View>
            </DismissKeyboard>
        )
    }
}