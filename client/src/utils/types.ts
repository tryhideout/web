import { store } from 'redux/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface User {
	id: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	hideoutID: string | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
}

export interface UserAPIResponse {
	id: string | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	hideout_id: string | null;
	color: 'red' | 'blue' | 'purple' | 'yellow' | 'green' | 'orange' | null;
}

export interface Hideout {
	id: string | null;
	name: string | null;
	ownerID: string | null;
	joinCode: string | null;
}

export interface HideoutAPIResponse {
	id: string;
	name: string;
	owner_id: string;
	join_code: string;
}

export interface Auth {
	isLoggedIn: boolean | null;
	accessToken: string | null;
}

export interface AuthAPIResponse {
	access_token: string;
}
