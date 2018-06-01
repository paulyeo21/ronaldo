import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import navActions from './actions/nav';

class ProfileListItem extends Component {
  handleOnPress = () => {
    this.props.navigateTo(this.props.routeName, { params: { redirect: this.props.redirect }});
  };

  render() {
    return (
      <TouchableHighlight
        onPress={ this.handleOnPress }
        activeOpacity={ 0.9 }
        underlayColor='#d3d3d3'
      >
        <View style={ styles.container }>
          <Icon name={ this.props.icon } />
          <Text>{ this.props.text }</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

const mapDispatchToProps = dispatch => ({
  navigateTo: (routeName, options) => dispatch(navActions.navigateTo(routeName, options))
});

export default connect(null, mapDispatchToProps)(ProfileListItem);
