/**
 *
 */

'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>BROWSE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue'
  },
  content: {
    textAlign: 'center'
  }
});
