import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import MainNavigator from './Navigator';

const authNavigator = SwitchNavigator(
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
  }
);

export default authNavigator;
