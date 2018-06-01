import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

import Login from '../Login';
import Register from '../Register';
import MainNavigator from '../Navigator';

// Defining this navigator here and importing into Ronaldo because for some reason it's undefined when import/export is reversed
export const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  MainNavigator: { screen: MainNavigator },
},
{
  headerMode: 'none',
});

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const firstAction = AppNavigator.router.getActionForPathAndParams('MainNavigator');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

export default nav = (state = initialNavState, action) => {
  console.log(action.type);
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Register':

      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Register' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
