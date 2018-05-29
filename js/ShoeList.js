import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import ShoeItem from './ShoeItem';
import _ from 'underscore';
import styles from '../css';
import shoeActions from './actions/shoe';
import { config } from './api/config';
import * as api from './api';

class ShoeList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      fromPage: 0,
      pageSize: config.maxPageSize,
      query: ''
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

  _fetchShoes = () => {
    this.props.fetchShoes(this.state.query, this.state.fromPage, this.state.pageSize)
      .then(res => {
        if (res.status === 200) {
          this.setState({ refreshing: false });
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
      this._fetchShoes(this.state.query, this.state.fromPage, this.state.pageSize);
    });
  };

  handleLoadMore = () => {
    // Only fetch if more than page size otherwise, needlessly fetches
    // because the end is apparent without much scrolling
    // TODO: when end of flatlist should stop requesting and not increment fromPage
    if (this.props.shoes.length >= this.state.pageSize) {
      this.setState({
        fromPage: this.state.fromPage + this.state.pageSize
      }, () => {
        this._fetchShoes(this.state.query, this.state.fromPage, this.state.pageSize);
      });
    }
  };

  handleChangeText = (query) => {
    this.setState({
      fromPage: 0,
      query: query
    }, () => {
      this._fetchShoes(query, this.state.fromPage, this.state.pageSize);
    });
  };

  render() {
    return (
      <View>
        <SearchBar
          placeholder="Search"
          lightTheme
          clearIcon={{ style: styles.searchBarClearIcon }}
          containerStyle={ styles.searchBarContainer }
          inputStyle={ styles.searchBarInput }
          icon={{ style: styles.searchBarIcon }}
          onChangeText={ this.handleChangeText }
        />
        <TouchableHighlight style={ styles.filterButton }>
          <Text style={ styles.filterButtonText }>
            Filter
          </Text>
        </TouchableHighlight>
        <FlatList
          data={ this.props.shoes }
          extraData={ this.props.shoes }
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
  shoes: state.shoes.listings
});

const mapDispatchToProps = dispatch => ({
  fetchShoes: (query, fromPage, pageSize) => dispatch(shoeActions.fetchShoes(query, fromPage, pageSize))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoeList);

