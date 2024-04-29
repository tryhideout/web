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

export enum ClientRoutes {
	EXPENSES = '/app/expenses',
	CHORES = '/app/chores',
	EXTERNAL = '/',
	LOGIN = '/auth/login',
	SIGNUP = '/auth/signup',
	ONBOARDING_CREATE = '/onboarding/create',
	ONBOARDING_JOIN = '/onboarding/join',
}

export const ToastDefaultOptions = {
	duration: 9000,
	variant: 'left-accent',
	isClosable: true,
	position: 'top-right',
};

export enum ToastDefaultTitles {
	INFO = 'A quick note.',
	LOADING = 'Action pending...',
	WARNING = 'Caution.',
	ERROR = 'An error occurred.',
	SUCCESS = 'Success!',
}
