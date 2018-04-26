import React, { Component } from 'react';
import { connect } from 'react-redux';
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

function mapStateToProps(state, props) {
  return {}
}

export default connect(mapStateToProps)(ShoeDawg);
