import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import navActions from './actions/nav';

const LoginFields = t.struct({
  username: t.String,
  password: t.String,
});
const RegisterFields = t.struct({
  username: t.String,
  password: t.String,
});

class AuthModal extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'login',
      error: null,
      isLoading: false,
    }
  }

  onPressLogin = () => {
    const { email, password } = this.form.getValue();
    if (email && password) {
      this.props.login(email, password)
        .then(res => {
          if (res) {
            this.props.navigateTo(this.props.navigation.getParam('toRoute', 'MainNavigation'));
          }
        });
    }
  }

  onPressRegister = () => {
    const { email, password } = this.form.getValue();
    if (email && password) {
      api.createUser(email, password)
        .then((response) => {
          if (response.status === 201) {
            // Auto-login
            this.props.login(email, password)
              .then(res => {
                if (res) {
                  this.props.navigateTo(this.props.navigation.getParam('toRoute', 'MainNavigation'));
                }
              });
          } else {
            response.json().then(json => {
              this.setState({
                isLoading: false,
                error: `${response.status}: ${json.message}`,
              });
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            error: error.message,
          });
          console.log(error);
        });
    }
  }

  onSwitchToLogin = () => {
    this.setState({ mode: 'login' });
  }

  onSwitchToRegister = () => {
    this.setState({ mode: 'register' });
  }

  onGoToContinueAsGuest = () => {
    this.props.navigateTo(this.props.navigation.getParam('backToRoute', 'MainNavigation'));
  }

  setForm = component => {
    this.form = component;
  }

  render() {
    let header;
    let submitButton;
    let switchButton;
    let form;
    if (this.state.mode === 'login') {
      header = <Text h2>Login</Text>;
      form = (
        <t.form.Form
          ref={ this.setForm }
          type={ LoginFields }
        />
      );
      submitButton = (
        <Button
          onPress={ this.onPressLogin }
        >
          { this.state.isLoading ? <ActivityIndicator /> : <Text>Login</Text> }
        </Button>
      );
      switchButton = (
        <Button
          onPress={ this.onSwitchToRegister }
        >
          <Text>Go to Register</Text>
        </Button>
      );
    } else if (this.state.mode === 'register') {
      header = <Text h2>Register</Text>;
      form = (
        <t.form.Form
          ref={ this.setForm }
          type={ RegisterFields }
        />
      );
      submitButton = (
        <Button
          onPress={ this.onPressRegister }
        >
          { this.state.isLoading ? <ActivityIndicator /> : <Text>Register</Text> }
        </Button>
      );
      switchButton = (
        <Button
          onPress={ this.onSwitchToLogin }
        >
          <Text>Go to Login</Text>
        </Button>
      );
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { this.state.error ? <Text>{ this.state.error }</Text> : null }
        { header }
        <View>
          { form }
          { submitButton }
          { switchButton }
          <Button
            onPress={ this.onGoToContinueAsGuest }
          >
            <Text>Continue as Guest</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: routeName => dispatch(navActions.navigateTo(routeName)),
    login: (email, password) => dispatch(sessionActions.login(email, password))
  };
}

export const ConnectedAuthModal = connect(null, mapDispatchToProps)(AuthModal);
