import * as actionTypes from './actionTypes';

export const update = items => ({
	type: actionTypes.UPDATE,
	items,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});
