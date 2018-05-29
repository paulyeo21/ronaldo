import { SET_SHOE_LISTINGS, APPEND_SHOE_LISTINGS } from './actionTypes';
import * as api from '../api';

export const setShoeListings = (json) => ({
  type: SET_SHOE_LISTINGS,
  shoes: json
});

export const appendShoeListings = (json) => ({
  type: APPEND_SHOE_LISTINGS,
  shoes: json
});

export const loadShoes = (fromPage, pageSize) => {
  return dispatch => {
    return api.fetchShoes(fromPage, pageSize)
      .then(res => {
        if (res.status === 200) {
          res.json().then(json => { // { shoeListings: ... }
            if (fromPage == 0) {
              dispatch(setShoeListings(json.shoeListings));
            } else {
              dispatch(appendShoeListings(json.shoeListings));
            }
          });
          return true;
        } else {
          return false;
        }
      });
  };
};

export default {
  setShoeListings,
  loadShoes
};
