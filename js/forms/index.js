import t from 'tcomb-form-native';

export const Form = t.form.Form;
export const Email = t.refinement(t.String, function(s) {
  return /\S+@\S+\.\S+/.test(s);
});

export const RegisterForm = t.struct({
  email: Email,
  password: t.String,
  firstName: t.String,
  lastName: t.String,
  // dob: t.Date
});

export const LoginForm = t.struct({
  email: Email,
  password: t.String,
});

const emailField = {
  email: {
    keyboardType: 'email-address',
    error: 'Please enter a valid email',
  }
};

const passwordField = {
  password: {
    secureTextEntry: true,
    error: 'Please enter a password',
  }
};

export const registerFormOptions = {
  auto: 'placeholders',
  fields: {
    ...emailField,
    ...passwordField,
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
};

export const loginFormOptions = {
  auto: 'placeholders',
  fields: {
    ...emailField,
    ...passwordField,
  },
};
