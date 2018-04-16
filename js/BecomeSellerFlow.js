import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
} from 'react-native';
import {
  Text,
  Icon,
} from 'react-native-elements';
import Button from './shared/Button';
import NavTabHeader from './shared/NavTabHeader';
import FlowModal from './shared/FlowModal';

class Screen1 extends Component {
  static displayName = "Screen1"

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text h3>Why?</Text>
        <Text h4>Why sell on ShoeHead?</Text>
        <Text>Shoe Head makes it simple and secure to reach millions of buyers looking for your shoe.</Text>
        <Text h4>Guarantee</Text>
        <Text>Buyers don't receive their shoes until you receive your money. Shoe Head processes each individual transaction and will release each respective party's asset or money when everything checks through.</Text>
        <Text h4>Manage your assets</Text>
        <Text>Your shoes are your assets. With every transaction, Shoe Head will track and deliver insights into how your transactions are stacking so that you get every ounce out of your shoes.</Text>
        <Text h4>Questions?</Text>
        { this.props.nextButton }
      </View>
    );
  }
}

class Screen2 extends Component {
  static displayName = "Screen2"

  render() {
    const steps = [
      {
        key: "step1",
        text: "Request and print your shipping label",
      },
      {
        key: "step2",
        text: "Attach shipping label to box with shoe (include box if DS condition).",
      },
      {
        key: "step3",
        text: "Ship!",
      },
    ];

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text h3>Why?</Text>
          <Text>Introduction on how to ship your shoes.</Text>
        </View>
        <FlatList
          data={ steps }
          renderItem={ ({item}) => <Text>{ item.text }</Text> }
        />
        { this.props.prevButton }
        { this.props.nextButton }
      </View>
    );
  }
}

class Screen3 extends Component {
  static displayName = "Screen3"

  render() {
    return (
      <View style={{ flex: 1 }}><Text>3</Text></View>
    );
  }
}

class Screen4 extends Component {
  static displayName = "Screen4"

  render() {
    return (
      <View style={{ flex: 1 }}><Text>4</Text></View>
    );
  }
}

class Screen5 extends Component {
  static displayName = "Screen5"

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Congratulations! You are one step closer to becoming a Shoe Head!</Text>
        { this.props.prevButton }
        { this.props.doneButton }
      </View>
    );
  }
}

const flowOrder = ["Screen1", "Screen2", "Screen3", "Screen4", "Screen5"];

export default FlowModal(
  flowOrder,
  {
    "Screen1": {
      screen: Screen1,
    },
    "Screen2": {
      screen: Screen2,
    },
    "Screen3": {
      screen: Screen3,
    },
    "Screen4": {
      screen: Screen4,
    },
    "Screen5": {
      screen: Screen5,
    },
  },
  {
    initialRouteName: "Screen1",
    headerMode: 'none',
  },
);
