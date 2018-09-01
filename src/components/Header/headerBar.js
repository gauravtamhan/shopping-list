import React, { Component } from 'react';
import { View } from 'react-native';
import { BlurView } from 'react-native-blur';


export default class HeaderBar extends Component {

  render() {
    return (
      <View style={{
        borderBottomColor: 'rgb(100,100,100)',
        borderBottomWidth: 0.5
      }}>
        <BlurView
          style={{ top: 0, left: 0, right: 0, height: 65 }}
          blurType="light"
          blurAmount={30} // 25
        />
      </View>
    )
  }
}