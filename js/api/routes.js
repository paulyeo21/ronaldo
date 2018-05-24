const namespace = 'api';

export const routes = {
  user: {
    post: `/${namespace}/users`,
    get: `/${namespace}/users`,
  },
  login: `/${namespace}/login`,
  logout: `/${namespace}/logout`,
  currentLogin: `/${namespace}/current_login`,
};

