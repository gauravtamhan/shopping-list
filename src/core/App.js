import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from '@scenes/Home/index';
import ShoppingList from '@scenes/ShoppingList/index';



const RootStack = createStackNavigator(
  {
    Home: { screen: Home },
    ShoppingList: { screen: ShoppingList },
  },
  {
    initialRouteName: 'Home',
    headerTransitionPreset: 'uikit',
    navigationOptions: {
      headerTintColor: '#000',
      headerTitleStyle: { fontWeight: '600' }
    },
  }
)

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootStack />
      </View>
    );
  }
}


