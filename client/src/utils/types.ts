import { store } from '@/redux/store';
import { AuthProviderIDs } from '@/utils/constants';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface User {
	id: number | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
	hideoutID: number | null;
	status: 'available' | 'busy' | 'away' | 'do_not_disturb' | null;
}

export interface UsersAPIRequest {
	email: string;
	password?: string;
	social_token?: string;
	first_name: string;
	last_name: string;
}

export interface UsersAPIResponse {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	hideout_id: number | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
	status: 'available' | 'busy' | 'away' | 'do_not_disturb' | null;
}

export interface APIResponseError {
	data: {
		error: string;
	};
	status: number;
}

export interface Hideout {
	id: number | null;
	name: string | null;
	ownerID: number | null;
	joinCode: string | null;
}

export interface HideoutsAPIRequest {
	name: string;
	owner_id: number;
}

export interface HideoutsAPIResponse {
	id: number;
	name: string;
	owner_id: number;
	join_code: string;
}

export interface Session {
	isLoggedIn: boolean | null;
	accessToken: string | null;
	userID: number | null;
}

export interface SessionsAPIEmailLoginRequest {
	email: string;
	password: string;
}

export interface SessionsAPISocialLoginRequest {
	email: string;
	social_token: string;
}

export interface SessionsAPIResponse {
	user_id: number;
	access_token: string;
}

export type FirebaseProviderID = AuthProviderIDs.GOOGLE | AuthProviderIDs.FACEBOOK | AuthProviderIDs.GITHUB;

export interface SignupFormState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
