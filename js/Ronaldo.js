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
    this.props.fetchShoes();
  }

  render() {
    return <RootStack />;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchShoes: () => dispatch(shoeActions.fetchShoes())
});

export default connect(null, mapDispatchToProps)(Ronaldo);

