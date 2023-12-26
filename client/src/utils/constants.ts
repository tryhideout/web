export const FETCH_CREDENTIALS_INCLUDE = 'include';

export enum ReduxSliceNames {
	SESSION = 'session',
	USER = 'user',
	HIDEOUT = 'hideout',
	EXPENSES = 'expenses',
	CHORES = 'chores',
}

export enum ReduxTagTypes {
	SESSION = 'Session',
	USER = 'User',
	HIDEOUT = 'Hideout',
	EXPENSES = 'Expenses',
	CHORES = 'Chores',
}

export enum HTTPRequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export enum APIPaths {
	BASE_PATH = '/api',
	SESSIONS_PATH = '/sessions',
	USERS_PATH = '/users',
	HIDEOUTS_PATH = '/hideouts',
}

export enum HTTPStatusCodes {
	UNAUTHORIZED = 401,
}
