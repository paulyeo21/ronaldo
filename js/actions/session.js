import { SET_SESSION, CLEAR_SESSION } from './actionTypes';
import { setEmail } from './email';
import * as api from '../api';


export const setSession = session => ({
  type: SET_SESSION,
  session
});

export const clearSession = () => ({
  type: CLEAR_SESSION
});

export const login = (email, password) => {
  return dispatch => {
    dispatch(setEmail(email));

    return api.login(email, password)
      .then(res => {
        if (res.status == 200) {
          const session = {
            accessToken: res.headers.get('Set-Authorization'),
            refreshToken: res.headers.get('Set-Refresh-Token')
          }
          dispatch(setSession(session))
          return session
        } else {
          // Handle errors
        }
      });
  };
};

export const currentLogin = () => {
  return (dispatch, getState) => {
    const session = getState().session;
    return api.currentLogin(session.accessToken, session.refreshToken)
      .then(res => {
        console.log(res);
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    const session = getState().session;
    return api.logout(session.accessToken, session.refreshToken)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          dispatch(clearSession());
        }
      });
  };
};
