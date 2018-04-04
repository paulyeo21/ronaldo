import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import HomeScreen from './HomeScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="search" color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
    }
  }
);
