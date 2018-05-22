import { UPDATE_ITEM, EMPTY_ITEM } from './actionTypes';

export const updateItem = items => ({
  type: UPDATE_ITEM,
  items,
});

export const emptyItem = () => ({
  type: EMPTY_ITEM,
});
