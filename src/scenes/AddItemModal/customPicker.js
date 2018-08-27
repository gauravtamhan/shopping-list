import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import styles from '@theme/styles'


export default class CustomPicker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data, selectedVal, onValChange } = this.props
    return (
      <View style={{ height: 200, justifyContent: 'center' }}>
        <Picker
          selectedValue={selectedVal}
          style={{ height: 46, justifyContent: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'rgb(216,217,218)' }}
          onValueChange={(itemValue) => { onValChange(itemValue) }}
        >
          {
            data.map((obj, i) => (<Picker.Item key={i} label={obj.label} value={obj.value} />))
          }
        </Picker>
      </View>
    )
  }
}