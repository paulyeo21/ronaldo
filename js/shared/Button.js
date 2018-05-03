import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  Text,
} from 'react-native-elements';

export default class Button extends Component {
  onPressWrapper = () => {
    if (this.props.disabled) return;

    this.props.onPress();
  }
  render() {
    const content = this.props.title
      ? <Text>{ this.props.title }</Text>
      : this.props.children;

    return (
      <TouchableHighlight
        onPress={ this.onPressWrapper }
        activeOpacity={ 0.9 }
        underlayColor="#d3d3d3"
      >
        { content }
      </TouchableHighlight>
    );
  }
}
