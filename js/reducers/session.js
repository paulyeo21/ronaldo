import { SET_SESSION, CLEAR_SESSION } from '../actions/actionTypes';

const initialState = {
  accessToken: null,
  refreshToken: null
};

export default session = (state = initialState, action) => {
  switch (action.type) {
  case SET_SESSION:
    return { ...action.session };
  case CLEAR_SESSION:
    return initialState;
  default:
    return state;
  }
};
