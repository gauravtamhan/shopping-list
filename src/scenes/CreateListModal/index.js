import React, { Component } from 'react';
import { Text, View, TextInput, Keyboard, ScrollView } from 'react-native';
import styles from '@theme/styles';
import { NAV_COLOR } from '@theme/colors';
import { HeaderButton, HeaderBar } from '@components/Header/index';



export default class CreateListModal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'New List',
            headerTransparent: true,
            headerBackground: (<HeaderBar />),
            headerLeft: (<HeaderButton text={'Cancel'} onPress={navigation.getParam('cancelModal')} />),
            // headerRight: (<HeaderButton text={'Done'} onPress={navigation.getParam('handleDone')} />)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ cancelModal: this._cancelModal });
    }

    _cancelModal = () => {
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
            groceries: {},
        }
        addListFunc(newObj);
        navigation.goBack();
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: 'rgb(242,242,243)' }]}>
                <ScrollView>
                    <View style={{height: 65}} />
                    <View style={styles.iosTextInputWrapper}> 
                        <TextInput
                            style={styles.iosTextInput}
                            onChangeText={(text) => this.setState({ name: text })}
                            autoCapitalize='words'
                            autoFocus={true}
                            clearButtonMode='while-editing'
                            placeholder='Title'
                            placeholderTextColor='rgb(198,198,202)'
                            value={this.state.name}
                            returnKeyType='done'
                            selectionColor='rgb(7,106,219)'
                            enablesReturnKeyAutomatically={true}
                            onSubmitEditing={(e) => this._createNewList(e.nativeEvent.text)}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}