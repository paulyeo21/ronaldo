import { Buffer } from 'buffer';
import { fetchApi } from '../api/index';
import apiConfig from '../api/config';

const endPoints = {
	authenticate: '/posts/1',
	revoke: '/api/logout',
	refresh: '/api/current_login',
};

export const authenticate = (email, password) => fetchApi(endPoints.authenticate, {}, 'get', {
	Authorization: `Basic ${new Buffer(`${email}:${password}`).toString('base64')}`,
});

export const refresh = (token, user) => fetchApi(endPoints.refresh, { token, user }, 'post', {
	'Client-ID': apiConfig.clientId,
	Authorization: null,
});

export const revoke = tokens => fetchApi(endPoints.revoke, { tokens }, 'post');
