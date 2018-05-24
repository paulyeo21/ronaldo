import React, { Component } from 'react';
import { View } from 'react-native';

import ShoeList from './ShoeList';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ShoeList />
      </View>
    );
  }
}
