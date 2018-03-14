import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

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
        <Text>Home Screen</Text>
      </View>
    );
  }
}

export default TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: () => <Icon name="home" />
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarIcon: () => <Icon name="search" />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: () => <Icon name="person" />
    }
  }
});

