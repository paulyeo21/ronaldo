import { combineReducers } from 'redux';
import sessionReducer from './session';
import emailReducer from './email';
import navReducer from './nav';

export default reducer = combineReducers({
  session: sessionReducer,
  email: emailReducer,
  nav: navReducer,
});
