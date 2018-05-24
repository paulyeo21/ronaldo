import { SET_EMAIL } from '../actions/actionTypes';

export default email = (state = null, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return action.email
  default:
    return state;
  }
};
