import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from '@scenes/Home/index';
import ShoppingList from '@scenes/ShoppingList/index';
import CreateListModal from '@scenes/CreateListModal/index';
import AddItemModal from '@scenes/AddItemModal/index';



const MainStack = createStackNavigator(
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


