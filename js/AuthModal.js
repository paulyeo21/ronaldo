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
import * as sessionSelectors from './selectors/session';

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
            this.props.navigation.navigate('MainNavigator');
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
                  this.props.navigation.navigate('MainNavigator');
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
    this.props.navigation.state.params.onAuthFailure();
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
    authenticate: (email, password) => {
      session.authenticate(email, password);
    },
  };
}

export const ConnectedAuthModal = connect(() => ({}), mapDispatchToProps)(AuthModal);

export const protectedComponent = WrappedComponent => {
  const mapStateToProps = (state, props) => {
    return {
      accessToken: sessionSelectors.get().tokens.access.value,
    };
  };

  return connect(mapStateToProps)(
    class ProtectedComponent extends Component {
      componentWillMount() {
        if (!this.props.accessToken) {
          this.props.navigation.navigate('AuthModal',{
            onAuthSuccess: this.onAuthSuccess,
            onAuthFailure: this.onAuthFailure,
          });
        }
      }

      onAuthSuccess = () => {
        this.props.navigation.navigate(this.props.navigation.state.routeName);
      }

      onAuthFailure = () => {
        this.props.navigation.navigate('Home');
      }

      render() {
        return this.props.accessToken
          ? <WrappedComponent { ...this.props }/>
          : null;
      }
    }
  );
};
