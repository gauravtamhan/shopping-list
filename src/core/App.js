import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from '@scenes/Home/index';
import ShoppingList from '@scenes/ShoppingList/index';
import CreateListModal from '@scenes/CreateListModal/index';
import AddItemModal from '@scenes/AddItemModal/index';

import { NAV_COLOR } from '@theme/colors';


const MainStack = createStackNavigator(
  {
    Home: { screen: Home },
    ShoppingList: { screen: ShoppingList },
  },
  {
    initialRouteName: 'Home',
    headerTransitionPreset: 'uikit',
    navigationOptions: {
      // headerTintColor: 'rgba(0,0,0,0.7)',
      headerTintColor: NAV_COLOR,
      headerTitleStyle: { fontWeight: '600', color: '#000' }
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    CreateListModal: {
      screen: CreateListModal,
    },
    AddItemModal: {
      screen: AddItemModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootStack />
      </View>
    );
  }
}


