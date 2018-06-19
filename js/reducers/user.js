import { LOGIN_USER, LOGOUT_USER, SET_SESSION } from '../actions/actionTypes';

const initialState = {
  email: null,
  session: {
    accessToken: null,
    refreshToken: null
  }
};

export default user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_USER:
    const { email, session } = action.data;
    return {
      email: email,
      session
    };
  case LOGOUT_USER:
    return initialState;
  case SET_SESSION:
    return {
      ...state,
      session: action.session
    };
  default:
    return state;
  }
};
