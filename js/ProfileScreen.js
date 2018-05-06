import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Button from './shared/Button';
import NavTabHeader from './shared/NavTabHeader';
import BecomeSellerFlow from './BecomeSellerFlow';
import UserProfile from './UserProfile';
import { protectedComponent } from './AuthModal';

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
    this.props.navigation.navigate(this.props.navigateTo);
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
        navigateTo: "BecomeSellerFlow",
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
        <Button
          onPress={ () => { this.props.navigation.navigate("UserProfile") } }
        >
          <NavTabHeader title='Profile' />
        </Button>
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
    ProfileTabRoot: {
      screen: protectedComponent(ProfileScreen),
    },
    UserProfile: {
      screen: UserProfile,
    },
    BecomeSellerFlow: {
      screen: BecomeSellerFlow,
    },
  },
  {
    initialRouteName: "ProfileTabRoot",
    mode: 'modal',
    headerMode: 'none',
  },
);
