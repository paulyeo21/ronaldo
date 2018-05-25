import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements';
import sessionActions from './actions/session';
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
    const data = this.form.getValue(); // cant do const { email, password} because will
                                       // fail to parse when this.form.getValue() is null
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
    this.props.navigation.navigate('MainNavigator');
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
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(sessionActions.login(email, password))
});

export default connect(null, mapDispatchToProps)(LoginScreen);

