import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Navigator from './Navigator';

class ShoeDawg extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator />
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

