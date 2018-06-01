import { AppNavigator } from './AppNavigator';
import { NavigationActions } from 'react-navigation';
import { LOGIN_ROUTE } from './routes';

// https://reactnavigation.org/docs/en/navigation-actions.html#docsNav
const navigationAction = (routeName, params) => {
  return NavigationActions.navigate({ routeName: routeName, params: params });
};

// https://reactnavigation.org/docs/en/custom-routers.html#getstateforactionaction-state
export const navigationState = (routeName, params={}, state) => {
  return AppNavigator.router.getStateForAction(navigationAction(routeName, params), state);
};

export const protectedNavigationState = (routeName, params={}, state) => {
  return state.isLoggedIn
    ? navigationState(routeName, params, state) 
    : navigationState(LOGIN_ROUTE, { redirect: routeName }, state);
};
