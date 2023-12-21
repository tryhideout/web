import { LOG_IN_WITH_CREDENTIALS, SIGN_UP_WITH_CREDENTIALS, REFRESH_SESSION, LOG_OUT } from 'redux/actions/types';
import { ReducerInput } from 'utils/types';

interface UserState {
	isLoggedIn: boolean | null;
	userID: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	hideoutID: string | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
	accessToken: string | null;
}

const INITIAL_STATE: UserState = {
	isLoggedIn: false,
	userID: null,
	email: null,
	firstName: null,
	lastName: null,
	hideoutID: null,
	color: null,
	accessToken: null,
};

const userReducer = (state: UserState = INITIAL_STATE, { type, success, payload }: ReducerInput): UserState => {
	if (!success) return state;
	switch (type) {
		case LOG_IN_WITH_CREDENTIALS:
		case SIGN_UP_WITH_CREDENTIALS:
		case REFRESH_SESSION:
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
		case LOG_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default userReducer;
