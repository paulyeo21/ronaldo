import React, { Component } from 'react';
import _ from 'underscore';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Icon,
} from 'react-native-elements';
import Button from './Button';
import { StackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
});

function flowComponent(InnerComponent, flowOrder) {
  return (
    props => {
      let headerButtons = [];
      let footerButtons = [];

      headerButtons.push(
        <Button
          key="closeButton"
          onPress={() => { props.screenProps.dismiss() }}
        >
          <Icon
            type="font-awesome"
            name="times"
          />
        </Button>
      );

      const flowIndex = flowOrder.indexOf(InnerComponent.displayName);

      if (flowIndex === 0) {
        footerButtons.push(
          <Button
            key="nextButton"
            onPress={ () => { props.navigation.navigate(flowOrder[flowIndex + 1]); } }
            title="Next"
          />
        )
      } else if (flowIndex > 0 && flowIndex < flowOrder.length - 1) {
        footerButtons.push(
          <Button
            key="backButton"
            onPress={ () => { props.navigation.goBack(null); } }
            title="Back"
          />
        );
        footerButtons.push(
          <Button
            key="nextButton"
            onPress={ () => { props.navigation.navigate(flowOrder[flowIndex + 1]); } }
            title="Next"
          />
        );
      } else if (flowIndex === flowOrder.length - 1) {
        footerButtons.push(
          <Button
            key="backButton"
            onPress={ () => { props.navigation.goBack(null); } }
            title="Back"
          />
        );
        footerButtons.push(
          <Button
            key="doneButton"
            onPress={ () => { props.screenProps.dismiss(); } }
            title="Done"
          />
        )
      } else {
        console.warn("Display item not defined in flow");
      }

      return (
        <View style={{ flex: 1 }}>
          { headerButtons }
          <InnerComponent {...props} />
          { footerButtons }
        </View>
      );
    }
  );
};

function DismissableStackNavigator(routes, options) {
  const StackNav = StackNavigator(routes, options);

  return class DismissableStackNav extends Component {
    static router = StackNav.router;

    render() {
      const { state, goBack } = this.props.navigation;
      const screenProps = {
        dismiss: () => goBack(state.key),
      };
      return (
        <StackNav
          navigation={ this.props.navigation }
          screenProps={ screenProps }
        />
      );
    }
  }
};

function FlowModal(flowOrder, routes, routeOptions) {
  const flowRoutes = _.mapObject(routes, (route, routeName) => {
    return { screen: flowComponent(route.screen, flowOrder) };
  });

  return DismissableStackNavigator(flowRoutes, routeOptions);
}

export default FlowModal;
