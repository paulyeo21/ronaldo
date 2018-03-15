import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';

class ShoeItem extends Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <Text>Shoe</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    height: 100
  }
});

export default ShoeItem;
