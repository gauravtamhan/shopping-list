import React, { Component } from 'react';
import { View } from 'react-native';
import { BlurView } from 'react-native-blur';


export default class HeaderBar extends Component {

  render() {
    return (
      <View style={{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0.5},
        shadowOpacity: 0.3,
        shadowRadius: 0,
        backgroundColor: 'transparent',
      }}>
        <BlurView
          style={{ top: 0, left: 0, right: 0, height: 65, backgroundColor: 'rgba(248,247,248,0.25)' }}
          blurType="light"
          blurAmount={28} // 25
        />
      </View>
    )
  }
}