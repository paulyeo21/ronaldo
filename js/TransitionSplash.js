import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import navActions from './actions/nav';

class TransitionSplash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigateTo(this.props.navigation.getParam('redirect', 'MainNavigation'))
    }, 1000);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text h2>Changing</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
});

const mapDispatchToProps = dispatch => ({
  navigateTo: routeName => dispatch(navActions.navigateTo(routeName)),
});

export default connect(null, mapDispatchToProps)(TransitionSplash);
