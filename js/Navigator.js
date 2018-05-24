import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import HomeScreen from './HomeScreen';
import ListingsScreen from './ListingsScreen';
import StatisticsScreen from './StatisticsScreen';
import { ConnectedAuthModal } from './AuthModal';

const BuyNavigator = createBottomTabNavigator(
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
);

const SellNavigator = createBottomTabNavigator(
  {
    Listings: {
      screen: ListingsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />
      }
    },
    Statistics: {
      screen: StatisticsScreen,
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
  }
)

const MainTabNavigator = createStackNavigator(
  {
    BuyNavigator: {
      screen: BuyNavigator,
    },
    SellNavigator: {
      screen: SellNavigator,
    },
    AuthModal: {
      screen: ConnectedAuthModal,
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default MainTabNavigator;
