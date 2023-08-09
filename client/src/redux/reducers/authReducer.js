import { LOG_IN_WITH_CREDENTIALS, SIGN_UP_WITH_CREDENTIALS, REFRESH_SESSION } from 'redux/actions/types';

const INITIAL_STATE = {
	isLoggedIn: null,
	userID: null,
	email: null,
	firstName: null,
	lastName: null,
	hideoutID: null,
	color: null,
	accessToken: null,
};

const authReducer = (state = INITIAL_STATE, { type, success, payload }) => {
	if (success === false) return state;
	switch (type) {
		case LOG_IN_WITH_CREDENTIALS:
		case SIGN_UP_WITH_CREDENTIALS:
			return {
				...state,
				isLoggedIn: true,
				userID: payload.id,
				email: payload.email,
				firstName: payload.first_name,
				lastName: payload.last_name,
				hideoutID: payload.hideout_id,
				color: payload.color,
				accessToken: payload.access_token,
			};
		case REFRESH_SESSION:
			return {
				...state,
				accessToken: payload.accessToken,
			};
		default:
			return state;
	}
};

export default authReducer;
