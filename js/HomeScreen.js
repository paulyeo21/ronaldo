import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import styles from '../css';

import ShoeList from './ShoeList';

export default class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={ styles.screenContainer }>
        <ShoeList />
      </SafeAreaView>
    );
  }
}
