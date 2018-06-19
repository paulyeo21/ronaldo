import { combineReducers } from 'redux';
import userReducer from './user';
import shoeReducer from './shoe';
import navReducer from './nav';

export default combineReducers({
  user: userReducer,
  shoes: shoeReducer,
  nav: navReducer,
});
