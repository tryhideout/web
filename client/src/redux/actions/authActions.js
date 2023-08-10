import { LOG_IN_WITH_CREDENTIALS, SIGN_UP_WITH_CREDENTIALS, REFRESH_SESSION, LOG_OUT } from 'redux/actions/types';
import { usersAPI, sessionsAPI } from 'services/api';
import { showToast, HTTPError } from 'services/helpers';

export const signUpWithCredentials = (email, password, firstName, lastName) => async (dispatch) => {
	try {
		const response = await usersAPI.post({
			email: email,
			password: password,
			first_name: firstName,
			last_name: lastName,
		});

		if (!response.success) throw new HTTPError(response);

		const loginResponse = await sessionsAPI.post({
			email: email,
			password: password,
		});

		dispatch({ type: SIGN_UP_WITH_CREDENTIALS, ...loginResponse });
		showToast.success('Account created.', 'Welcome to Hideout! Your account has been created.');
	} catch (error) {
		showToast.error('Email already in use.', 'Please try again with a different email.');
		dispatch({ type: SIGN_UP_WITH_CREDENTIALS, success: false, payload: null });
	}
};

export const logInWithCredentials = (email, password) => async (dispatch) => {
	try {
		const response = await sessionsAPI.post({
			email: email,
			password: password,
		});

		if (!response.success) throw new HTTPError(response);

		dispatch({ type: LOG_IN_WITH_CREDENTIALS, ...response });
		showToast.success('Successfully logged in!', 'Welcome back to Hideout.');
	} catch (error) {
		showToast.error('Invalid email or password.', 'Please try again with correct credentials');
		dispatch({ type: LOG_IN_WITH_CREDENTIALS, success: false, payload: null });
	}
};

export const refreshSession = () => async (dispatch) => {
	const response = await sessionsAPI.put();
	dispatch({ type: REFRESH_SESSION, ...response });
};

export const logOut = () => async (dispatch) => {
	const response = await sessionsAPI.remove();

	dispatch({ type: LOG_OUT, ...response });
	window.location.href = '/';
};
