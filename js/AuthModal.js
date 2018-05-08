import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import Button from './shared/Button';
import {
  Icon,
  Text,
} from 'react-native-elements';
import t from 'tcomb-form-native';
import * as sessionSelectors from './services/session/selectors';
import Login from './Login';
import Register from './Register';

const mapStateToProps = (state, props) => {
  return {
    accessToken: sessionSelectors.get().tokens.access.value,
  };
}

export const protectedComponent = WrappedComponent => {
  return connect(mapStateToProps)(
    class ProtectedComponent extends Component {
      componentWillMount() {
        if (!this.props.accessToken) {
          const nav = this.props.navigation;
          nav.navigate('AuthModalNavigator', {
            navigateTo: nav.state.routeName, // route to continue on to after auth
          });
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  )
};

export default StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
  },
  {
    initialRouteName: 'Login',
  }
)
