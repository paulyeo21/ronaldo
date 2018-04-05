import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class NavTabHeader extends Component {
  render() {
    return (
      <View style={ styles.NavTabHeaderContainer }>
        <Text style={ styles.titleText }>{ this.props.title }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  NavTabHeaderContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});
