import { SET_SHOE_LISTINGS, APPEND_SHOE_LISTINGS } from './actionTypes';
import * as api from '../api';
import { config } from '../api/config';

const setShoeListings = (json) => ({
  type: SET_SHOE_LISTINGS,
  shoes: json
});

const appendShoeListings = (json) => ({
  type: APPEND_SHOE_LISTINGS,
  shoes: json
});

const defaultPayload = {
  'q': '',
  'from': 0,
  'size': config.maxPageSize,
  'filters': {}
}

const fetchShoes = (payload = defaultPayload) => {
  return dispatch => {
    const response = api.fetchShoes(payload);
    response
      .then(res => res.json())
      .then(json => {
        if (payload.from === 0) {
          dispatch(setShoeListings(json.shoeListings));
        } else {
          dispatch(appendShoeListings(json.shoeListings));
        }
      })
      .catch(error => {
        console.log(error);
      }); // TODO: handle error
    return response;
  };
};

export default {
  setShoeListings,
  appendShoeListings,
  fetchShoes
};
