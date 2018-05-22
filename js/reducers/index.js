import { combineReducers } from 'redux';
import sessionReducer from './session';
import emailReducer from './email';

export default reducer = combineReducers({
  session: sessionReducer,
  email: emailReducer,
});

