import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import shoeReducer from './shoe';

export default reducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  shoes: shoeReducer,
});

