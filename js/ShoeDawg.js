/**
 *
 */

'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import Footer from './Footer';

class ShoeDawg extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}></View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  content: {
    flex: 1
  }
});

export default ShoeDawg;
