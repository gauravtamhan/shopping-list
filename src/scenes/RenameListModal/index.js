import React, { Component } from 'react';
import { Text, View, TextInput, Keyboard, ScrollView } from 'react-native';
import styles from '@theme/styles';
import { NAV_COLOR } from '@theme/colors';
import { HeaderButton, HeaderBar } from '@components/Header/index';



export default class RenameListModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit List Title',
      headerTransparent: true,
      headerBackground: (<HeaderBar />),
      headerLeft: (<HeaderButton text={'Cancel'} onPress={navigation.getParam('cancelModal')} />)
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
    let old_title = this.props.navigation.getParam('title');
    this.setState({ name: old_title });
  }

  _cancelModal = () => {
    const { navigation } = this.props;
    Keyboard.dismiss();
    navigation.goBack();
  }

  _updateListTitle(name) {
    const { navigation } = this.props;
    const renameListFunc = navigation.getParam('renameList');
    const index = navigation.getParam('index');
    renameListFunc(index, name);
    navigation.goBack();
  }

  render() {
    return (
      <View style={[styles.container, styles.background]}>
        <ScrollView keyboardDismissMode={'interactive'}>
          <View style={{ height: 65 }} />
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
              onSubmitEditing={(e) => this._updateListTitle(e.nativeEvent.text)}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}