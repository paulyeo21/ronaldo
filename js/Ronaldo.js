import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';
import MainNavigator from './Navigator';
import shoeActions from './actions/shoe';
import { config } from './api/config';

const RootStack = createSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    MainNavigator: {
      screen: MainNavigator,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

class Ronaldo extends Component {
  componentDidMount() {
    this.props.loadShoes(0, config.flatListSize);
  }

  render() {
    return <RootStack />;
  }
}

const mapDispatchToProps = dispatch => ({
  loadShoes: (fromPage, pageSize) => dispatch(shoeActions.loadShoes(fromPage, pageSize))
});

export default connect(null, mapDispatchToProps)(Ronaldo);

