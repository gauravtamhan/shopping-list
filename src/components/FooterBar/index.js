import React, { Component } from 'react';
import { View } from 'react-native';
import { BlurView } from 'react-native-blur';


export class FooterBar extends Component {

  render() {
    return (
      <View style={{
        height: 45,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -0.5 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <BlurView
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 45,
            backgroundColor: 'rgba(248,247,248,0.25)',
          }}
          blurType="light"
          blurAmount={28} // 25
        />
        {this.props.children}
      </View>
    )
  }
}