import { NavigationActions } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { NAVIGATE, SET_SESSION, CLEAR_SESSION } from '../actions/actionTypes';

import Login from '../Login';
import Register from '../Register';
import MainNavigator from '../Navigator';

// Defining this navigator here and importing into Ronaldo because for some reason it's undefined when import/export is reversed
export const AppNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  MainNavigator: { screen: MainNavigator },
},
{
  headerMode: 'none',
});

function findRouteNameFromNavigatorState ({ routes }) {
  let route = routes[routes.length - 1];
  while (route.index !== undefined) route = route.routes[route.index];
  return route.routeName;
}

function buildProtectedNextState(toRoute, state) {
  return state.isLoggedIn
    ? AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: toRoute }),
        state
      )
    : AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'AuthModal',
          params: {
            backToRoute: findRouteNameFromNavigatorState(state),
            toRoute,
          },
        }),
        state
      );
}

// set up initial state with the login screen
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const initState = {
  ...AppNavigator.router.getStateForAction(firstAction),
  isLoggedIn: false,
};

export default nav = (state = initState, action) => {
  let nextState;
  switch (action.type) {
    case SET_SESSION:
      nextState = {
        ...state,
        isLoggedIn: !!action.session.accessToken,
      };
      break;
    case NAVIGATE:
      switch (action.routeName) {
        case 'Profile':
          nextState = buildProtectedNextState('Profile', state);
          break;
      }
      break;
  }

  // next state || default navigator next state || current state
  return nextState || AppNavigator.router.getStateForAction(action, state) || state;
}
