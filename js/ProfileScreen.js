import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import NavTabHeader from './shared/NavTabHeader';

class ProfileListItem extends Component {
  onPress = () => {
  }

  render() {
    let content = <Text>{ this.props.text }</Text>;

    return (
      <TouchableHighlight
         onPress={this.onPress}
         activeOpacity={ 0.9 }
         underlayColor='#d3d3d3'
      >
        <View key={ this.props.text } style={ styles.ProfileListItemContainer }>
          <Icon name={ this.props.icon } />
          { content }
        </View>
      </TouchableHighlight>
    )
  }
}

export default class ProfileScreen extends Component {
  render() {
    const profileListItems = [
      {
        icon: "drafts",
        text: "Invite Friends",
      },
      {
        icon: "face",
        text: "Become a Seller",
      },
      {
        icon: "payment",
        text: "Payment",
      },
      {
        icon: "settings",
        text: "Settings",
      },
      {
        icon: "feedback",
        text: "Feedback",
      },
    ];

    return (
      <ScrollView>
        <NavTabHeader title='Profile' />
        <FlatList
          data={ profileListItems }
          renderItem={ ({ item }) => <ProfileListItem { ...item } /> }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ProfileListItemContainer: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
