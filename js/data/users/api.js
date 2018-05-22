import { fetchApi } from '../../services/api';

const endPoints = {
	create: '/api/users',
	get: '/api/users',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'get');
