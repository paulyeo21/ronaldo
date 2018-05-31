import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import SizesRow from './SizesRow';
import _ from 'underscore';

/* Constants
============================================================================= */
const NUMBER_OF_ROWS = 6;

/* <SizesPicker />
============================================================================= */
class SizesPicker extends Component {
  partitionSizes = (sizes) => {
    const sortedSizes = _.keys(sizes).sort(function(a, b) { return a - b }); // [4, 4.5, ..., 18.5, 19]
    return _.chunk(sortedSizes, NUMBER_OF_ROWS); // [[4, 4.5, ...], ... [18.5, 19, ...]]
  };

  renderSizesRows = (sizes, handler) => {
    const partitions = this.partitionSizes(sizes);
    return _.map(partitions, function(chunk) {
      return <SizesRow
        key={ Math.random() }
        value={ chunk }
        touched={ sizes }
        style={ styles.sizesRow }
        handleOnPressSize={ handler }
      />
    });
  };

  render() {
    return (
      <View style={ styles.grid }>
        { this.renderSizesRows(this.props.sizes, this.props.handleOnPressSize) }
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    flex: 1
  },
});

/* Exports
============================================================================= */
export default SizesPicker;
