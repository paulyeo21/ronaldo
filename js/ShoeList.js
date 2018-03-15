import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ShoeItem from './ShoeItem';

class ShoeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [
        {
          id: "1",
          name: "Yeezy Boost 700 'OG'",
          color: "Solid Grey/ Chalk White/ Core Black",
          price: "100"
        },
        { 
          id: "2",
          name: "Flyknit Trainer",
          color: "Black",
          price: "150"
        },
        {
          id: "3",
          name: "Cargo Khaki",
          color: "White",
          price: "50"
        }
      ]
    }
  }

  _renderItem = ({item}) => (
    <ShoeItem />
  );

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.shoes}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ShoeList;
