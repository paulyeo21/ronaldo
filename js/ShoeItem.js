import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from '../css';

class ShoeItem extends Component {
  render() {
    return (
      <View style={ styles.shoeItem }>
        <Text>{ this.props.brand.toUpperCase() }</Text>
        <Text>{ this.props.name.toUpperCase() }</Text>
        <Text>{ this.props.sku }</Text>
      </View>
    );
  }
}

export default ShoeItem;
