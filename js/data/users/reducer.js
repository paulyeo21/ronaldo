import * as actionTypes from './actionTypes';

const initialState = {
  items: {},
};

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE:
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
