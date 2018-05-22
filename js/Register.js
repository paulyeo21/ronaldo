import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Button from './shared/Button';
import {
  Icon,
  Text,
} from 'react-native-elements';
import t from 'tcomb-form-native';
import * as usersApi from './data/users/api';
import * as session from './services/session';
import * as api from './services/api';
import moment from 'moment';

const Form = t.form.Form;

const Email = t.refinement(t.String, function(s) {
  return /\S+@\S+\.\S+/.test(s)
});

const Register = t.struct({
  email: Email,
  password: t.String,
  firstName: t.String,
  lastName: t.String,
  // dob: t.Date
})

const options = {
  auto: 'placeholders',
  fields: {
    email: {
      keyboardType: 'email-address',
      error: 'Please enter a valid email'
    },
    password: {
      secureTextEntry: true,
      error: 'Please enter a password'
    },
    firstName: {
      error: 'Please enter a first name'
    },
    lastName: {
      error: 'Please enter a last name'
    },
    // dob: {
    //   mode: 'date',
    //   config: {
    //     format: (date) => moment(date).format('L')
    //   },
    // }
  }
}

class RegisterScreen extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      isLoading: false,
    }
  }

  onPressRegister = () => {
    const data = this.form.getValue();
    if (data) {
      fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
      .then((response) => {
        if (response.status == 201) {
          console.log(response);
          this.props.navigation.navigate('MainNavigator');
        } else {
          const _this = this;
          response.json().then(function(json) {
            _this.setState({
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
      })
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
            type={Register}
            options={options}
          />
          <Text style={styles.fineprint}>
            By creating an account, you agree to PREME's <Text style={styles.underline}>Privacy Policy</Text> and <Text style={styles.underline}>Terms of Use</Text>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  error: {
    marginBottom:30,
    backgroundColor: '#a94442',
    borderColor: '#a94442',
    borderWidth: 1,
    height: 20,
  },
  errorText: {
    alignSelf: 'center',
    color: 'white',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  fineprint: {
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 20
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  underline: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000"
  }
})

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

