import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import {
  Text,
} from 'react-native-elements';
import { Form, RegisterForm, registerFormOptions } from './forms';
import styles from '../css';
import sessionActions from './actions/session';
import * as api from './api';


class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoading: false,
    };
  }

  onPressRegister = () => {
    const data = this.form.getValue(); // cant do const { email, password} because will
                                       // fail to parse when this.form.getValue() is null
    if (data) {
      const { email, password } = data;
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

  onPressBack = () => {
    this.props.navigation.goBack(null);
  }

  setForm = component => {
    this.form = component;
  }

  onPressSignin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          {this.state.error ? <View style={styles.error}><Text style={styles.errorText}>{this.state.error}</Text></View> : null}
          <Text style={styles.title}>
            PREME
          </Text>
          <Form
            ref={this.setForm}
            type={RegisterForm}
            options={registerFormOptions}
          />
          <Text style={styles.fineprint}>
            By creating an account, you agree to PREME&#39;s <Text style={styles.underline}>Privacy Policy</Text> and <Text style={styles.underline}>Terms of Use</Text>
          </Text>
          <Text style={styles.fineprint}>
            Already a member? <Text style={styles.underline} onPress={this.onPressSignin}>Sign in</Text>
          </Text>
          <TouchableHighlight onPress={this.onPressRegister} style={styles.button}>
            {this.state.isLoading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Register</Text>}
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(sessionActions.login(email, password))
});

export default connect(null, mapDispatchToProps)(RegisterScreen);

