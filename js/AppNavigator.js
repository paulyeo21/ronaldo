import React from 'react';
import { createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Login from './Login';
import Register from './Register';
import SearchScreen from './SearchScreen';
import HomeScreen from './HomeScreen';
import ListingsScreen from './ListingsScreen';
import StatisticsScreen from './StatisticsScreen';
import ProfileScreen from './ProfileScreen';
import TransitionSplash from './TransitionSplash';
import {
  BUYER_HOME_ROUTE,
  BUYER_SEARCH_ROUTE,
  BUYER_PROFILE_ROUTE,
  SELLER_HOME_ROUTE,
  SELLER_PROFILE_ROUTE,
  SELLER_STATS_ROUTE
} from './routes';

const BuyNavigator = createBottomTabNavigator(
  {
    [BUYER_HOME_ROUTE]: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
        title: 'Home'
      }
    },
    [BUYER_SEARCH_ROUTE]: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="heart" type='font-awesome' color={tintColor} />,
        title: 'Search'
      }
    },
    [BUYER_PROFILE_ROUTE]: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
        title: 'Profile'
      }
    }
  },
);

const SellNavigator = createBottomTabNavigator(
  {
    [SELLER_HOME_ROUTE]: {
      screen: ListingsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
        title: 'Listings'
      }
    },
    [SELLER_STATS_ROUTE]: {
      screen: StatisticsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="search" color={tintColor} />,
        title: 'Statistics'
      }
    },
    [SELLER_PROFILE_ROUTE]: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="person" color={tintColor} />,
        title: 'Profile'
      }
    }
  }
);

export const AppNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  TransitionSplash: { screen: TransitionSplash },
  BuyNavigator: { screen: BuyNavigator },
  SellNavigator: { screen: SellNavigator },
},
{
  headerMode: 'none',
});

