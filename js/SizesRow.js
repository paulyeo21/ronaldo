import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Size from './Size';
import _ from 'underscore';

/* <SizesRow />
============================================================================= */
class SizesRow extends Component {
  renderSize = (sizes, touched, handler) => {
    return _.map(sizes, function(size) {
      return <Size key={ size } value={ size } touched={ touched[size] } handleOnPressSize={ handler } />
    });
  };

  render() {
    return (
      <View style={ styles.row }>
        { this.renderSize(this.props.value, this.props.touched, this.props.handleOnPressSize) }
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});

/* Exports
============================================================================= */
export default SizesRow;
