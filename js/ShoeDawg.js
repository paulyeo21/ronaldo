import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Header from './Header';
import Footer from './Footer';
import Navigator from './Navigator';

class ShoeDawg extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ShoeDawg;

