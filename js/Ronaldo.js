import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigationPropConstructor } from './configureStore';
import { 
  createNavigationPropConstructor,
  initializeListeners
} from 'react-navigation-redux-helpers';
import { AppNavigator } from './AppNavigator';
import shoeActions from './actions/shoe';

class Ronaldo extends Component {
  componentDidMount() {
    initializeListeners('root', this.props.nav);
    this.props.dispatch(shoeActions.fetchShoes());
  }

  render() {
    const navigation = createNavigationPropConstructor('root')(this.props.dispatch, this.props.nav);
    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(Ronaldo);
