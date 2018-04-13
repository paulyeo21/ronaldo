import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import NavTabHeader from './shared/NavTabHeader';
import BecomeSellerFlow from './BecomeSellerFlow';

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
});

class ProfileListItem extends Component {
  onPress = () => {
    this.props.navigation.navigate("BecomeSellerFlow");
  }

  render() {
    let content = <Text>{ this.props.text }</Text>;

    return (
      <TouchableHighlight
         onPress={this.onPress}
         activeOpacity={ 0.9 }
         underlayColor='#d3d3d3'
      >
        <View style={ styles.ProfileListItemContainer }>
          <Icon name={ this.props.icon } />
          { content }
        </View>
      </TouchableHighlight>
    )
  }
}

class ProfileScreen extends Component {
  render() {
    const profileListItems = [
      {
        key: "inviteFriends",
        icon: "drafts",
        text: "Invite Friends",
      },
      {
        key: "becomeSeller",
        icon: "face",
        text: "Become a Seller",
      },
      {
        key: "payment",
        icon: "payment",
        text: "Payment",
      },
      {
        key: "settings",
        icon: "settings",
        text: "Settings",
      },
      {
        key: "feedback",
        icon: "feedback",
        text: "Feedback",
      },
    ];

    return (
      <ScrollView>
        <NavTabHeader title='Profile' />
        <FlatList
          data={ profileListItems }
          renderItem={ ({ item }) => <ProfileListItem navigation={ this.props.navigation } { ...item } /> }
        />
      </ScrollView>
    );
  }
}

export default StackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    BecomeSellerFlow: {
      screen: BecomeSellerFlow,
    },
  },
  {
    initialRouteName: "Profile",
    mode: 'modal',
    headerMode: 'none',
  },
);
