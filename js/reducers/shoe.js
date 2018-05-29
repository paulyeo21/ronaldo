import { SET_SHOE_LISTINGS, APPEND_SHOE_LISTINGS } from '../actions/actionTypes';

const initialState = {
  listings: []
};

export default shoe = (state = initialState, action) => {
  const shoes = action.shoes

  switch (action.type) {
  case SET_SHOE_LISTINGS:
    return { listings: shoes };
  case APPEND_SHOE_LISTINGS:
    return { listings: state.listings.concat(shoes) };
  default:
    return state;
  }
};
