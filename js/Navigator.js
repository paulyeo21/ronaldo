import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ShoeList from './ShoeList';
import ProfileScreen from './ProfileScreen';

class SearchScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Search Screen</Text>
      </View>
    );
  }
}

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ShoeList />
      </View>
    );
  }
}

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
