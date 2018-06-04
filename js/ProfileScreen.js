import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
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
    let switchToSellerItem;
    if (true || this.props.user.hasSeller) {
      if (false) {
        switchToSellerItem = {
          key: "switchToBuyerNav",
          icon: "face",
          text: "Switch to buyer",
          navigateTo: "BuyNavigator",
        };
      } else {
        switchToSellerItem = {
          key: "switchToSellerNav",
          icon: "face",
          text: "Switch to seller",
          navigateTo: "SellNavigator",
        };
      }
    } else {
      switchToSellerItem = {
        key: "becomeSeller",
        icon: "face",
        text: "Become a Seller",
        navigateTo: "BecomeSellerFlow",
      };
    }

    const profileListItems = [
      {
        key: "inviteFriends",
        icon: "drafts",
        text: "Invite Friends",
      },
      switchToSellerItem,
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

const mapStateToProps = (state, props) => {
  return {
    user: state.session.user,
  };
}

const ConnectedProfileScreen = connect(mapStateToProps)(ProfileScreen);

export default createStackNavigator(
  {
    ProfileTabRoot: {
      screen: ConnectedProfileScreen,
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
