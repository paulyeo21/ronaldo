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
import * as session from './services/session';
import * as api from './services/api'

const LoginFields = t.struct({
  username: t.String,
  password: t.String,
});

class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      isLoading: false,
    }
  }

  onPressLogin = () => {
    const value = this.form.getValue();
    session.authenticate(value.email, value.password)
		.then(() => {
      const nav = this.props.navigation;
			nav.navigate(nav.getParam('navigateTo', 'MainNavigator'));
		})
		.catch(exception => {
			// Displays only the first error message
			const error = api.exceptionExtractError(exception);
			this.setState({
				isLoading: false,
				...(error ? { error } : {}),
			});

			if (!error) {
				throw exception;
			}
		});
  }

  onContinueAsGuest = () => {
    this.props.navigation.navigate('MainNavigator');
  }

  renderError = () => {
		if (!this.state.error) return;

    return (<Text style={ styles.error }>{ this.state.error }</Text>);
	}

  onRegister = () => {
    const nav = this.props.navigation;
    nav.navigate('Register', {
      navigateTo: nav.getParam('navigateTo', 'MainNavigator'),
    });
  }

  setForm = component => {
    this.form = component;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.error ? <Text>{ this.state.error }</Text> : null}
				<Text h2>Login</Text>
				<View>
          <t.form.Form
            ref={ this.setForm }
            type={ LoginFields }
          />
					<Button
						onPress={ this.onPressLogin }
					>
					  { this.state.isLoading ? <ActivityIndicator /> : <Text>Login</Text> }
					</Button>
          <Button
						onPress={ this.onRegister }
					>
						<Text>Register</Text>
					</Button>
          <Button
						onPress={ this.onContinueAsGuest }
					>
						<Text>Continue as Guest</Text>
					</Button>
				</View>
			</View>
    );
  }
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password) => {
      session.authenticate(email, password);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
