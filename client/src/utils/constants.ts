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
	TOKEN_PATH = '/token',
	USERS_PATH = '/users',
	HIDEOUTS_PATH = '/hideouts',
}

export enum HTTPStatusCodes {
	UNAUTHORIZED = 401,
}

export enum AuthProviderIDs {
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
	GITHUB = 'GITHUB',
}

enum GoogleProviderScopes {
	EMAIL = 'https://www.googleapis.com/auth/userinfo.email',
	PROFILE = 'https://www.googleapis.com/auth/userinfo.profile',
}

enum FacebookProviderScopes {
	EMAIL = 'email',
	PROFILE = 'public_profile',
}

enum GithubProviderScopes {
	EMAIL = 'user:email',
	PROFILE = 'read:user',
}

export const ProviderScopes = {
	GOOGLE: GoogleProviderScopes,
	FACEBOOK: FacebookProviderScopes,
	GITHUB: GithubProviderScopes,
};

export const FormRegex = {
	EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
	PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};

export enum FirebaseAuthErrorCodes {
	EXISTING_SOCIAL_CREDENTIAL = 'auth/account-exists-with-different-credential',
}
