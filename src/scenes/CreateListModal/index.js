import React, { Component } from 'react';
import { Text, View, TextInput, Keyboard, AsyncStorage } from 'react-native';
import styles from '@theme/styles'
import HeaderButton from '@components/HeaderButton/index';



export default class CreateListModal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {}
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    _cancelModal() {
        const { navigation } = this.props;
        Keyboard.dismiss();
        navigation.goBack();
    }

    _createNewList(name) {
        const { navigation } = this.props;
        const addListFunc = navigation.getParam('addList')

        let newObj = {
            title: name,
            date: new Date().toJSON(),
            groceries: [],
        }
        addListFunc(newObj);
        navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 65, paddingTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <HeaderButton icon={'ios-close'} size={36} onPress={() => this._cancelModal()} />
                </View>

                <View> 
                    <TextInput
                        style={styles.title}
                        onChangeText={(text) => this.setState({ name: text })}
                        autoCapitalize='words'
                        autoCorrect={false} 
                        autoFocus={true}
                        placeholder='List Name'
                        placeholderTextColor='rgba(0,0,0,0.4)'
                        value={this.state.name}
                        returnKeyType='done'
                        selectionColor='rgba(0,0,0,1)'
                        enablesReturnKeyAutomatically={true}
                        onSubmitEditing={(e) => this._createNewList(e.nativeEvent.text)}
                    />
                </View>
            </View>
        )
    }
}