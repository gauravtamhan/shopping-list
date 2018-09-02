import React, { Component } from 'react';
import { View, Picker, TouchableHighlight, Text, Animated } from 'react-native';
import { NAV_COLOR } from '@theme/colors';
import styles from '@theme/styles'


export default class CustomPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerVisible: false,
      enablePicker: false,
      controlHeight: new Animated.Value(0)
    }
  }

  render() {
    const { label, labelValue, data, selectedVal, onValChange } = this.props
    return (
      <View>
        <TouchableHighlight
          style={styles.selectInputWrapper}
          underlayColor={'rgb(235,235,235)'}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          onPress={() => {
            if (!this.state.pickerVisible) {
              Animated.sequence([
                Animated.timing(this.state.controlHeight, { toValue: 200, duration: 200 })
              ]).start(() => {
                this.setState({
                  enablePicker: true
                })
              });
            } else {
              Animated.sequence([
                Animated.timing(this.state.controlHeight, { toValue: 0, duration: 200 })
              ]).start(
                this.setState({
                  enablePicker: false
                })
              );
            }
            
            this.setState({
              pickerVisible: !this.state.pickerVisible
            })
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 17 }}>{label}</Text>
            <Text style={{ fontSize: 17, color: NAV_COLOR }}>{labelValue}</Text>
          </View>
        </TouchableHighlight>
        <Animated.View style={{ height: this.state.controlHeight, justifyContent: 'center' }}>
          { this.state.enablePicker &&
            <Picker
              selectedValue={selectedVal}
              style={{ height: 46, justifyContent: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'rgb(216,217,218)' }}
              onValueChange={(itemValue) => { onValChange(itemValue) }}
            >
              {
                data.map((obj, i) => (<Picker.Item key={i} label={obj.label} value={obj.value} />))
              }
            </Picker>
          }
        </Animated.View>
      </View>
    )
  }
}