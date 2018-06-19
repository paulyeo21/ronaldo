import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  FlatList
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Button from './shared/Button';
import NavTabHeader from './shared/NavTabHeader';
import BecomeSellerFlow from './BecomeSellerFlow';
import UserProfile from './UserProfile';
import ProfileListItem from './ProfileListItem';
import {
  BUYER_HOME_ROUTE,
  SELLER_HOME_ROUTE,
  SELLER_TAB,
  TRANSITION_SPLASH_ROUTE
} from './routes';

class ProfileScreen extends Component {
  _renderItem = ({ item }) => (
    <ProfileListItem
      navigation={ this.props.navigation }
      { ...item }
    />
  );

  sellerOrBuyerItem = () => {
    if (true || this.props.isSeller) {
      if (this.props.tabMode === SELLER_TAB) {
        return {
          key: 'switchToBuyerNav',
          icon: 'face',
          text: 'Switch to Buyer',
          routeName: TRANSITION_SPLASH_ROUTE,
          redirect: BUYER_HOME_ROUTE
        };
      } else {
        return {
          key: 'switchToSellerNav',
          icon: 'face',
          text: 'Switch to Seller',
          routeName: TRANSITION_SPLASH_ROUTE,
          redirect: SELLER_HOME_ROUTE
        };
      }
    } else {
      return {
        key: 'becomeSeller',
        icon: 'face',
        text: 'Become a Seller',
        routeName: 'BecomeSellerFlow',
        redirect: ''
      };
    }
  };

  _profileListItems = () => {
    return [
      {
        key: 'inviteFriends',
        icon: 'drafts',
        text: 'Invite Friends',
        routeName: ''
      },
      this.sellerOrBuyerItem(),
      {
        key: 'payment',
        icon: 'payment',
        text: 'Payment',
        routeName: ''
      },
      {
        key: 'settings',
        icon: 'settings',
        text: 'Settings',
        routeName: ''
      },
      {
        key: 'feedback',
        icon: 'feedback',
        text: 'Feedback',
        routeName: ''
      },
    ];
  };

  render() {
    return (
      <ScrollView>
        <Button
          onPress={ () => { this.props.navigation.navigate('UserProfile') } }
        >
          <NavTabHeader title='Profile' />
        </Button>
        <FlatList
          data={ this._profileListItems() }
          renderItem={ this._renderItem }
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tabMode: state.nav.tabMode,
  isSeller: state.user.isSeller
});

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
    initialRouteName: 'ProfileTabRoot',
    mode: 'modal',
    headerMode: 'none',
  },
);
