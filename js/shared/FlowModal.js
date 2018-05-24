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
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
});

function flowComponent(InnerComponent, flowOrder) {
  const flowIndex = flowOrder.indexOf(InnerComponent.displayName);

  return class FlowComponent extends Component {
    constructor() {
      super();
      this.flowIndex = flowIndex;
      this.flowOrder = flowOrder;

      this.state = {
        isNextEnabled: true,
        isPrevEnabled: true,
      };
    }

    navigatePrev = () => {
      if (!this.state.isPrevEnabled) return;
      this.props.navigation.goBack(null);
    }

    navigateNext = () => {
      if (!this.state.isNextEnabled) return;
      this.props.navigation.navigate(this.flowOrder[this.flowIndex + 1]);
    }

    enableNext = () => {
      this.setState({ isNextEnabled: true });
    }

    disableNext = () => {
      this.setState({ isNextEnabled: false });
    }

    enablePrev = () => {
      this.setState({ isPrevEnabled: true });
    }

    disablePrev = () => {
      this.setState({ isPrevEnabled: false });
    }

    close = () => {
      this.props.screenProps.dismiss();
    }

    prevButton = () => {
      return (
        <Button
          key="backButton"
          onPress={ this.navigatePrev }
          title="Back"
          disabled={ !this.state.isPrevEnabled }
        />
      );
    }

    nextButton = () => {
      return (
        <Button
          key="nextButton"
          onPress={ this.navigateNext }
          title="Next"
          disabled={ !this.state.isNextEnabled }
        />
      );
    }

    doneButton = () => {
      return (
        <Button
          key="doneButton"
          onPress={ this.close }
          title="Done"
        />
      );
    }

    closeButton = () => {
      return (
        <Button
          key="closeButton"
          onPress={ this.close }
        >
          <Icon
            type="font-awesome"
            name="times"
          />
        </Button>
      );
    }

    render() {
      let headerButtons = [];
      let navButtons = {};

      headerButtons.push(this.closeButton());
      if (this.flowIndex === 0) {
        navButtons.nextButton = this.nextButton();
      } else if (this.flowIndex > 0 && this.flowIndex < this.flowOrder.length - 1) {
        navButtons.prevButton = this.prevButton();
        navButtons.nextButton = this.nextButton();
      } else if (this.flowIndex === this.flowOrder.length - 1) {
        navButtons.prevButton = this.prevButton();
        navButtons.doneButton = this.doneButton();
      } else {
        console.warn("Display item not defined in flow");
      }

      return (
        <View style={{ flex: 1 }}>
          { headerButtons }
          <InnerComponent
            {...this.props}
            disableNext={ this.disableNext }
            enableNext={ this.enableNext }
            navigateNext={ this.navigateNext }
            navigatePrev={ this.navigatePrev }
            { ...navButtons }
          />
        </View>
      );
    }
  };
};

function DismissableStackNavigator(routes, options) {
  const StackNav = createStackNavigator(routes, options);

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
