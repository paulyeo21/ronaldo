import React, { Component } from 'react';
import _ from 'underscore';
import moment from 'moment';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
  Text,
  Icon,
} from 'react-native-elements';
import Button from './shared/Button';

const styles = StyleSheet.create({
  UserProfileListItemContainer: {
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

class UserProfileEditor extends Component {
  render() {
    return (
      <ScrollView style={ styles.ProfileListItemContainer }>
        <Button
          key="closeButton"
          onPress={ () => { this.props.navigation.goBack(null); } }
        >
          <Icon
            type="font-awesome"
            name="times"
          />
        </Button>
        <Image
          style={{width: 100, height: 100}}
          source={ {uri: "https://via.placeholder.com/100x100" } } // prof pic
        />
        <Text h3>Editor</Text>
        <Text>Editor</Text>
      </ScrollView>
    )
  }
}

class UserProfileListItem extends Component {
  render() {
    let title = <Text>{ this.props.title }</Text>;
    let content = <Text>{ this.props.content }</Text>;

    return (
      <View style={ styles.UserProfileListItemContainer }>
        { title }
        { content }
      </View>
    )
  }
}

// accept user prop
class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentWillMount() {
    // placeholder user. should be loading user object into redux store at app root
    fetch('https://jsonplaceholder.typicode.com/users/1', {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(responseJson => {
      // expect any response for testing
      if (!_.isEmpty(responseJson)) {
        this.setState({
          user: _.extend(responseJson, {
            joinedDate: moment().subtract(7, 'days').format("MMM YYYY"),
            screenName: "aznShoeBoi",
            fullName: "James Park",
            isSeller: false,
          }),
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    const user = this.state.user;

    if (_.isEmpty(user)) {
      return <View style={{ flex: 1 }}><ActivityIndicator /></View>;
    }

    const userProfileListItems = [
      {
        key: "joined",
        title: "Joined",
        content: user.joinedDate,
      },
    ];

    let becomeSellerContent;
    if (!user.isSeller) {
      becomeSellerContent = (
        <Button
          onPress={ () => { this.props.navigation.navigate("BecomeSellerFlow"); } }
          title="Start selling"
        />
      );
    }

    return (
      <ScrollView>
        <Button
          key="closeButton"
          onPress={ () => { this.props.navigation.goBack(null); } }
        >
          <Icon
            type="font-awesome"
            name="times"
          />
        </Button>
        <Button
          onPress={ () => { this.props.navigation.navigate("UserProfileEditor"); } }
          title="Edit"
        />
        <Image
          style={{width: 100, height: 100}}
          source={ {uri: "https://via.placeholder.com/100x100" } } // prof pic
        />
        <Text h3>{ user.screenName }</Text>
        <Text>{ user.fullName }</Text>
        <FlatList
          data={ userProfileListItems }
          renderItem={ ({ item }) => <UserProfileListItem navigation={ this.props.navigation } { ...item } /> }
        />
        { becomeSellerContent }
      </ScrollView>
    )
  }
}

export default StackNavigator(
  {
    UserProfile: {
      screen: UserProfile,
    },
    UserProfileEditor: {
      screen: UserProfileEditor,
    },
  },
  {
    initialRouteName: "UserProfile",
    mode: 'modal',
    headerMode: 'none',
  },
);
