import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements';
import { login, logout, currentLogin } from './actions';
import { Form, LoginForm, loginFormOptions } from './forms';
import styles from '../css';


class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoading: false,
    };
  }

  componentWillMount() {
    // refreshToken().then(() => {
    //   this.props.navigation.navigate('MainNavigator');
    // }).catch(() => {
    //   this.props.navigation.navigate('Login');
    // });
  }

  onPressLogin = () => {
    const data = this.form.getValue();
    if (data) {
      this.props.login(data.email, data.password)
        .then(res => {
          if (res) {
            this.props.navigation.navigate('MainNavigator');
          } 
        });
    }
  }

  onContinueAsGuest = () => {
    // this.props.login('a@gmail.com', 'a');
    this.props.navigation.navigate('MainNavigator');
  }

  onRefresh = () => {
    // this.props.currentLogin();
    // this.props.logout();
  }

  onRegister = () => {
    this.props.navigation.navigate('Register');
  }

  setForm = component => {
    this.form = component;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.error ? <View style={styles.error}><Text style={styles.errorText}>{this.state.error}</Text></View> : null}
        <Text style={styles.title}>
          PREME
        </Text>
        <View>
          <Form
            ref={this.setForm}
            type={LoginForm}
            options={loginFormOptions}
          />
          <TouchableHighlight onPress={this.onPressLogin} style={styles.button}>
            { this.state.isLoading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Login</Text> }
          </TouchableHighlight>
          <Text style={styles.fineprint}>
            Not a member? <Text style={styles.underline} onPress={this.onRegister}>Register</Text>
          </Text>
          <Text style={styles.fineprint}>
            <Text style={styles.underline} onPress={this.onContinueAsGuest}>Continue as guest</Text>
          </Text>
          {/*
          <Text style={styles.fineprint}>
            <Text style={styles.underline} onPress={this.onRefresh}>Refresh Token</Text>
          </Text>
          */}
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  logout: () => dispatch(logout()),
  currentLogin: () => dispatch(currentLogin())
});

export default connect(() => ({}), mapDispatchToProps)(LoginScreen);

