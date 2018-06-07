import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Text,
  Icon,
} from 'react-native-elements';
import { connect } from 'react-redux';
import navActions from './actions/nav';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
});

class TransitionSplash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigateTo(this.props.navigation.getParam('toRoute', 'MainNavigation'), { force: true })
    }
    , 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h2>Changing</Text>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  navigateTo: (routeName, options) => dispatch(navActions.navigateTo(routeName, options)),
});

export default connect(null, mapDispatchToProps)(TransitionSplash);
