// import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';
import MainNavigator from './Navigator';

export default createSwitchNavigator(
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
