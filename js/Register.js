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
import * as usersApi from './data/users/api';
import * as session from './services/session';
import * as api from './services/api'

const Register = t.struct({
  username: t.String,
  password: t.String,
});

class RegisterScreen extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      isLoading: false,
    }
  }

  onPressRegister = () => {
    const value = this.form.getValue();
    usersApi.create(value.email, value.password)
		.then(() => {
			this.props.navigation.navigate('MainNavigator');
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

  onPressBack = () => {
    this.props.navigation.goBack(null);
  }

  renderError = () => {
		if (!this.state.error) return;

    return (<Text style={ styles.error }>{ this.state.error }</Text>);
	}

  setForm = component => {
    this.form = component;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.error ? <Text>{ this.state.error }</Text> : null}
        <Button
          onPress={ this.onPressBack }
        >
          <Text>Back</Text>
        </Button>
				<Text h2>Register</Text>
				<View>
          <t.form.Form
            ref={ this.setForm }
            type={ Register }
          />
					<Button
						onPress={ this.onPressRegister }
					>
					  { this.state.isLoading ? <ActivityIndicator /> : <Text>Register</Text> }
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
