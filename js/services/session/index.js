import configureStore from '../../configureStore';
import * as api from './api';
import * as actionCreators from './actions';
import * as selectors from './selectors';
import { initialState } from './reducer';

const { store } = configureStore();
const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const setSessionTimeout = (duration) => {
	clearTimeout(sessionTimeout);
	sessionTimeout = setTimeout(
		refreshToken,
		(duration - SESSION_TIMEOUT_THRESHOLD) * 1000
	);
};

const onRequestSuccess = (response) => {
	// all values used here are fake until we can get real data from server
	store.dispatch(actionCreators.update({
		tokens: {
			access: {
				value: response.headers.get('Authorization') || 'blah',
				expiresIn: response.headers.get('expiresIn') || 3600,
			},
			refresh: {
				value: 'blah',
			}
		},
		user: {
			id: 'aznShoeGod',
		},
	}));
	setSessionTimeout(response.headers.get('expiresIn') || 3600); // 1 hour
};

const clearSession = () => {
	clearTimeout(sessionTimeout);
	store.dispatch(actionCreators.update(initialState));
};

const onRequestFailed = (exception) => {
	clearSession();
	throw exception;
};

export const refreshToken = () => {
	const session = selectors.get();

	if (!session.tokens.refresh.value || !session.user.id) {
		return Promise.reject();
	}

	return api.refresh(session.tokens.refresh, session.user)
	.then(onRequestSuccess)
	.catch(onRequestFailed);
};

export const authenticate = (email, password) => (
	api.authenticate(email, password)
  .then(onRequestSuccess)
	.catch(onRequestFailed)
);
