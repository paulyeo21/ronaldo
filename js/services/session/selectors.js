import store from '../../configureStore';

export const get = () => {
  return store.getState().services.session;
}
