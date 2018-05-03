import store from '../../configureStore';
import * as api from './api';
import * as actionCreators from './actions';

export const authenticate = (email, password) => (
	api.authenticate(email, password)
  .then(response => {
    store.dispatch(actionCreators.update({
      tokens: {
        access: {
          value: response.headers.get('Authorization'),
        },
      },
    }));
  })
);
