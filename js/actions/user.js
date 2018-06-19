import { LOGIN_USER, LOGOUT_USER, SET_SESSION } from './actionTypes';
import * as api from '../api';

const loginUser = data => ({
  type: LOGIN_USER,
  data
});

const logoutUser = () => ({
  type: LOGOUT_USER
});

const setSession = session => ({
  type: SET_SESSION,
  session
});

const login = (email, password) => {
  return dispatch => {
    return api.login(email, password)
      .then(res => {
        if (res.status == 200) {
          const data = {
            email: email,
            session: {
              accessToken: res.headers.get('Set-Authorization'),
              refreshToken: res.headers.get('Set-Refresh-Token')
            }
          };
          dispatch(loginUser(data));
          return data;
        } else {
          // Handle errors
        }
      });
  };
};

const currentLogin = () => {
  return (dispatch, getState) => {
    const session = getState().user.session;
    return api.currentLogin(session.accessToken, session.refreshToken)
      .then(res => {
        console.log(res);
      });
  };
};

const logout = () => {
  return (dispatch, getState) => {
    const session = getState().session;
    return api.logout(session.accessToken, session.refreshToken)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          dispatch(logoutUser());
        }
      });
  };
};

export default {
  loginUser,
  logoutUser,
  setSession,
  login,
  currentLogin,
  logout
};
