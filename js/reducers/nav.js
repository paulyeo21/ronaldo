import { NAVIGATE, LOGIN_USER } from '../actions/actionTypes';
import { navigationState, protectedNavigationState } from '../NavigationHelpers';
import {
  LOGIN_ROUTE,
  BUYER_HOME_ROUTE,
  BUYER_SEARCH_ROUTE,
  BUYER_PROFILE_ROUTE,
  BUYER_TAB,
  SELLER_HOME_ROUTE,
  SELLER_STATS_ROUTE,
  SELLER_PROFILE_ROUTE,
  SELLER_TAB
} from '../routes';

const initialState = {
  ...navigationState(LOGIN_ROUTE),
  isLoggedIn: false,
  tabMode: 'BuyNavigator',
};

// https://github.com/react-navigation/react-navigation/blob/master/src/NavigationActions.js#L23
export default nav = (state = initialState, action) => {
  const options = action.options || {}; // Redux Navigateion actions don't have options field

  switch (action.type) {
  case LOGIN_USER:
    return { ...state, isLoggedIn: true };
  case NAVIGATE:
    switch (action.routeName) {
    case BUYER_HOME_ROUTE || BUYER_SEARCH_ROUTE:
      return navigationState(
        action.routeName,
        { ...options.params },
        { ...state, tabMode: BUYER_TAB }
      );
    case BUYER_PROFILE_ROUTE:
      return protectedNavigationState(
        action.routeName,
        { ...options.params },
        { ...state, tabMode: BUYER_TAB }
      );
    case SELLER_HOME_ROUTE || SELLER_STATS_ROUTE || SELLER_PROFILE_ROUTE:
      return navigationState(
        action.routeName,
        { ...options.params },
        { ...state, tabMode: SELLER_TAB }
      );
    default:
      return navigationState(action.routeName, { ...options.params }, state);
    }
  default:
    return state;
  }
}
