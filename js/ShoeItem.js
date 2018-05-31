import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';

/* <ShoeItem />
============================================================================= */
class ShoeItem extends Component {
  render() {
    return (
      <View style={ styles.shoeItem }>
        <Text>{ this.props.brand.toUpperCase() }</Text>
        <Text>{ this.props.name.toUpperCase() }</Text>
        <Text>{ this.props.description.toUpperCase() }</Text>
        <Text>{ this.props.condition.toUpperCase() }</Text>
        <Text>{ this.props.gender.toUpperCase() }</Text>
        <Text>{ this.props.sku }</Text>
        <View style={ styles.sizes }>
          {
            this.props.sizes.map(size => {
              return <Text key={ size } style={ styles.sizeText }>{ size }</Text>;
            })
          }
        </View>
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  shoeItem: {
    padding: 20,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 3
  },
  sizes: {
    flexDirection: 'row'
  },
  sizeText: {
    marginRight: 5
  }
});

/* Exports
============================================================================= */
export default ShoeItem;
