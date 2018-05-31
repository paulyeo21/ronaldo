import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

/* <Size />
============================================================================= */
class Size extends Component {
  render() {
    return (
      <TouchableHighlight
        style={ this.props.touched ? styles.touchedSizeContainer : styles.sizeContainer }
        onPress={ this.props.handleOnPressSize.bind(this, this.props.touched, this.props.value) }
      >
        <Text style={ this.props.touched? styles.touchedSizeText : styles.sizeText }>
          { this.props.value }
        </Text>
      </TouchableHighlight>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  sizeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 15,
    borderColor: 'black',
  },
  touchedSizeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 15,
    backgroundColor: '#48BBEC'
  },
  sizeText: {
    fontSize: 12
  },
  touchedSizeText: {
    color: 'white'
  }
});

/* Exports
============================================================================= */
export default Size;
