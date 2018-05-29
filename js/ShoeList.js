import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ShoeItem from './ShoeItem';
import _ from 'underscore';
import styles from '../css';
import shoeActions from './actions/shoe';
import { config } from './api/config';

class ShoeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      fromPage: 0,
      pageSize: config.flatListSize
    };
  };

  _renderItem = ({ item }) => (
    <ShoeItem
      name={ item.name }
      brand={ item.brand }
      sku={ item.sku }
    />
  );

  _keyExtractor = _ => _.sku.toString();
  
  renderSeparator = () => {
    return <View style={ styles.itemSeparator } />;
  };

  renderFooter = () => {
    return <View style={ styles.flatListFooter }/>;
  };

  fetchShoes = () => {
    this.props.loadShoes(this.state.fromPage, this.state.pageSize)
      .then(res => {
        if (res) {
          this.setState({
            refreshing: false,
          });
        }
      });
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      fromPage: 0 // Refreshing the list means getting new listings that may 
                  // have been created, but also starting pagination over, 
                  // because we don't want them to be at page 10 and getting a
                  // huge payload back
    }, () => {
      this.fetchShoes();
    });
  };

  handleLoadMore = () => {
    this.setState({
      fromPage: this.state.fromPage + this.state.pageSize
    }, () => {
      this.fetchShoes();
    });
  };

  render() {
    return (
      <View>
        <SearchBar
          placeholder="Search"
          lightTheme
          containerStyle={ styles.searchBarContainer }
          inputStyle={ styles.searchBarInput }
          icon={{ style: styles.searchBarIcon }}
        />
        <TouchableHighlight style={ styles.filterButton }>
          <Text style={ styles.filterButtonText }>
            Filter
          </Text>
        </TouchableHighlight>
        <FlatList
          data={ this.props.shoes.listings }
          renderItem={ this._renderItem }
          keyExtractor={ this._keyExtractor }
          ItemSeparatorComponent={ this.renderSeparator }
          ListFooterComponent={ this.renderFooter }
          refreshing={ this.state.refreshing }
          onRefresh={ this.handleRefresh }
          onEndReached={ this.handleLoadMore }
          onEndReachedThreshold={ 0.9 }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  shoes: state.shoes
});

const mapDispatchToProps = dispatch => ({
  loadShoes: (fromPage, pageSize) => dispatch(shoeActions.loadShoes(fromPage, pageSize))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoeList);

