import React, { Component } from 'react';
import moment from "moment";
import _ from "underscore";
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
import t from 'tcomb-form-native';
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

const accountType = t.enums({
  debit: "debit",
  wechat: "wechat",
  alipay: "alipay",
}, "accountType");

const months = _.reduce(moment.localeData().months(), (months, monthName, idx) => {
  months[idx + 1] = monthName;
  return months;
}, {});

const minYear = moment().year();

const years = _.reduce(_.range(minYear, minYear + 20), (years, year) => {
  years[year] = `${year}`;
  return years;
}, {})

const debitDetails = t.struct({
  type: accountType,
  number: t.Number,
  expMonth: t.enums(months),
  expYear: t.enums(years),
  cvc: t.Number,
});

const miscDetails = t.struct({
  type: accountType,
  name: t.String,
  password: t.String,
})

class Screen3 extends Component {
  static displayName = "Screen3"

  constructor() {
    super();

    const initValue = {};
    this.state = {
      value: initValue,
      type: this.getType(initValue),
    };
  }

  getType = value => {
    if (value.type === "debit") {
      return debitDetails;
    } else {
      return miscDetails;
    }
  }

  onChange = value => {
    const type = value.type !== this.state.value.type
      ? this.getType(value)
      : this.state.type;
    this.setState({ value, type });
  }

  setForm = component => {
    this.form = component;
  }

  onSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      // placeholder url for our endpoint
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      }).then(response => response.json())
      .then(responseJson => {
        // expect any response for testing
        if (!_.isEmpty(responseJson)) {
          this.props.navigateNext();
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text h3>Payout Information</Text>
        <Text>Enter your information correctly if you want to get paid!</Text>
        <t.form.Form
          ref={ this.setForm }
          type={ this.state.type }
          value={ this.state.value }
          onChange={ this.onChange }
        />
        { this.props.prevButton }
        <Button
          key="nextButton"
          onPress={ this.onSubmit }
          title="Next"
        />
      </ScrollView>
    );
  }
}

const returnAddress = t.struct({
  street: t.String,
  street2: t.String,
  city: t.String,
  state: t.String,
  zip: t.Number,
});

class Screen4 extends Component {
  static displayName = "Screen4"

  constructor() {
    super();

    const initValue = {};
    this.state = {
      value: initValue,
    };
  }

  setForm = component => {
    this.form = component;
  }

  onSubmit = () => {
    const value = this.form.getValue();
    if (value) {
      // placeholder url for our endpoint
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      }).then(response => response.json())
      .then(responseJson => {
        // expect any response for testing
        if (!_.isEmpty(responseJson)) {
          this.props.navigateNext();
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text h3>Return Address</Text>
        <Text>When cancellations, returns, or other issues arise we will ship your shoe back to this address.</Text>
        <t.form.Form
          ref={ this.setForm }
          type={ returnAddress }
        />
        { this.props.prevButton }
        <Button
          key="nextButton"
          onPress={ this.onSubmit }
          title="Next"
        />
      </View>
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
