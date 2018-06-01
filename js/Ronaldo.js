import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigationPropConstructor } from './configureStore';
import { initializeListeners } from 'react-navigation-redux-helpers';
// TODO: The import/export of AppNavigator should be reversed, but it only works
// when its init'd in the reduced and imported into here.
import { AppNavigator } from './reducers/nav';
import Login from './Login';
import Register from './Register';
import MainNavigator from './Navigator';

class AppWithNavigationState extends Component {
  componentDidMount() {
    initializeListeners('root', this.props.nav);
  }

  render() {
    const navigation = navigationPropConstructor(this.props.dispatch, this.props.nav);
    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
