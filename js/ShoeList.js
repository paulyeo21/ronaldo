import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  ScrollView,
  Switch
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import ShoeItem from './ShoeItem';
import FilterModal from './FilterModal';
import shoeActions from './actions/shoe';
import { config } from './api/config';
import _ from 'underscore';

/* Constants
============================================================================= */
const INITIAL_FILTERS_STATE = {
  ds: false,
  vnds: false,
  male: false,
  female: false,
  nike: false,
  adidas: false,
  sizes: {
    4: false,
    4.5: false,
    5: false,
    5.5: false,
    6: false,
    6.5: false,
    7: false,
    7.5: false,
    8: false,
    8.5: false,
    9: false,
    9.5: false,
    10: false,
    10.5: false,
    11: false,
    11.5: false,
    12: false,
    12.5: false,
    13: false,
    13.5: false,
    14: false,
    14.5: false,
    15: false,
    15.5: false,
    16: false,
    16.5: false,
    17: false,
    18: false,
    18.5: false,
    19: false
  }
};

/* <ShoeList />
============================================================================= */
class ShoeList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      fromPage: 0,
      pageSize: config.maxPageSize,
      query: '',
      modalVisible: false,
      filtered: 0, // Number of filters applied
      filters: INITIAL_FILTERS_STATE,
      previousFilters: INITIAL_FILTERS_STATE,
    };
  };

  _renderItem = ({ item }) => (
    <ShoeItem
      name={ item.name }
      brand={ item.brand }
      description={ item.description }
      condition={ item.condition }
      gender={ item.gender }
      sku={ item.sku }
      sizes={ item.sizes }
    />
  );

  _keyExtractor = _ => _.sku.toString();
  
  renderSeparator = () => {
    return <View style={ styles.itemSeparator } />;
  };

  renderFooter = () => {
    return <View style={ styles.flatListFooter }/>;
  };

  // Merge filters with same field i.e. { 'condition': ['ds', 'vnds'] }
  filtersPayload = () => {
    const f = this.state.filters;
    const filters = {
      'condition': [],
      'gender': [],
      'brand': [],
      'sizes': [],
    };

    if (f.ds) {
      filters.condition.push('ds');
    }
    if (f.vnds) {
      filters.condition.push('vnds');
    }
    if (f.male) {
      filters.gender.push('male');
    }
    if (f.female) {
      filters.gender.push('female');
    }
    if (f.nike) {
      filters.brand.push('nike');
    }
    if (f.adidas) {
      filters.brand.push('adidas');
    }
    _.map(this.state.filters.sizes, function(val, key) {
      if (val === true) {
        filters.sizes.push(key);
      }
    });

    // Filter out empty filter types otherwise filter query will try to match on empty fields
    // http://underscorejs.org/#pick
    return _.pick(filters, function(values, key) {
      return !_.isEmpty(values)
    });
  };

  payload = () => ({
    q: this.state.query,
    from: this.state.fromPage,
    size: this.state.pageSize,
    filters: this.filtersPayload()
  });

  _fetchShoes = () => {
    this.props.fetchShoes(this.payload())
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
      this._fetchShoes();
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
        this._fetchShoes();
      });
    }
  };

  handleChangeText = (query) => {
    this.setState({
      fromPage: 0,
      query: query
    }, () => {
      this._fetchShoes();
    });
  };

  onPressShowFilterModal = () => {
    this.setState({ modalVisible: true });
  };

  handleOnPressX = () => {
    this.setState({ modalVisible: false, filters: this.state.previousFilters });
  };

  handleApplyingFilters = () => {
    this.setState({ modalVisible: false });
  };

  handleOnDismiss = () => {
    const sizeFilters = _.filter(_.values(this.state.filters.sizes), (value) => value === true).length;
    const appliedFilters = _.filter(_.values(this.state.filters), (value) => value === true).length;
    this.setState({ filtered: sizeFilters + appliedFilters });
  };

  handleOnPressClear = () => {
    this.setState({ filters: INITIAL_FILTERS_STATE });
  };

  handleToggleChange = (value, filter) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [filter]: value // Set variable as key with []
      }
    });
  };

  handleApplyingFilters = () => {
    this.setState({
      fromPage: 0,
      modalVisible: false,
      previousFilters: this.state.filters
    }, () => {
      this._fetchShoes();
    });
  };

  handleOnPressSize = (touched, size) => {
    this.setState({
      filters: {
        ...this.state.filters,
        sizes: {
          ...this.state.filters.sizes,
          [size]: !touched
        }
      }
    }, () => {
      console.log(this.state.filters.sizes);
    });
  };

  render() {
    return (
      <SafeAreaView style={ styles.screenContainer }>
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
          <Text onPress={ this.onPressShowFilterModal } style={ styles.filterButtonText }>
            Filters{ (this.state.filtered === 0) ? null : ` ${this.state.filtered}` }
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
        <FilterModal
          visible={ this.state.modalVisible }
          filters={ this.state.filters }
          sizes={ this.state.filters.sizes }
          handleOnDismiss={ this.handleOnDismiss }
          handleOnPressX={ this.handleOnPressX }
          handleOnPressClear={ this.handleOnPressClear }
          handleToggleChange={ this.handleToggleChange }
          handleOnPressSize={ this.handleOnPressSize }
          handleApplyingFilters={ this.handleApplyingFilters }
        />
      </SafeAreaView>
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  filterButtonText: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 3,
  },
  searchBarContainer: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  searchBarInput: {
    backgroundColor: '#fff',
    fontSize: 16,
    height: 20
  },
  searchBarIcon: {
    position: 'absolute',
    top: 11,
    left: 12
  },
  searchBarClearIcon: {
    position: 'absolute',
    top: 11,
  },
  flatListFooter: {
    paddingTop: 85
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 0
  },
  itemSeparator: {
    height: 10,
    backgroundColor: '#fff',
  },
});

/* Exports
============================================================================= */
const mapStateToProps = state => ({
  shoes: state.shoes.listings
});

const mapDispatchToProps = dispatch => ({
  fetchShoes: (payload) => dispatch(shoeActions.fetchShoes(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoeList);

