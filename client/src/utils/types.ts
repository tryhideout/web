import { store } from 'redux/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface User {
	id: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
}

export interface UsersAPIRequest {
	email: string | null;
	password: string | null;
	first_name: string | null;
	last_name: string | null;
}

export interface UsersAPIResponse {
	id: string | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	hideout_id: string | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
	status: 'available' | 'busy' | 'away' | 'do_not_disturb' | null;
}

export interface Hideout {
	id: string | null;
	name: string | null;
	ownerID: string | null;
	joinCode: string | null;
}

export interface HideoutsAPIRequest {
	name: string;
	owner_id: number;
}

export interface HideoutsAPIResponse {
	id: string;
	name: string;
	owner_id: string;
	join_code: string;
	users: UsersAPIResponse[];
}

export interface Session {
	isLoggedIn: boolean | null;
	accessToken: string | null;
}

export interface SessionsAPIEmailLoginRequest {
	email: string;
	password: string;
}

export interface SessionsAPISocialLoginRequest {
	email: string;
	password: string;
}

export interface SessionsAPIResponse {
	access_token: string;
}
