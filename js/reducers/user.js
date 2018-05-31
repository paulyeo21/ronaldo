import { SET_EMAIL } from '../actions/actionTypes';

const initialState = {
  email: null
};

export default email = (state = initialState, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return { email: action.email };
  default:
    return state;
  }
};
