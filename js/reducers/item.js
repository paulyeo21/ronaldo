import { UPDATE_USER } from '../actions/actionTypes';

export default item = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        items: {
          ...state.items,
          ..._.reduce(action.items, (prev, curr) => ({
            ...prev,
            [curr.id]: curr,
          }), {}),
        }
      };
    default:
      return state;
  }
};
