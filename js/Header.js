import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={require('./img/user_icon.png')} />
        <Image style={styles.icon} source={require('./img/search_icon.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  icon: {
    width: 20,
    height: 20
  }
});
