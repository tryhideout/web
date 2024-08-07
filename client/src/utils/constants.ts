// Misc. Client Constants

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

export enum ClientRoutes {
	EXPENSES = '/app/expenses',
	CHORES = '/app/chores',
	EXTERNAL = '/',
	LOGIN = '/auth/login',
	SIGNUP = '/auth/signup',
	ONBOARDING_CREATE = '/onboarding/create',
	ONBOARDING_JOIN = '/onboarding/join',
	ONBOARDING_INVITE = '/onboarding/invite',
}

export const FormRegex = {
	EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
	PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};

// API Request / Response Constants

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
	CHORES_PATH = '/chores',
	EXPENSES_PATH = '/expenses',
}

export enum HTTPStatusCodes {
	UNAUTHORIZED = 401,
	CONFLICT = 409,
}

// Auth Constants

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

// General Toast & Promise Handler Constants

export const ToastDefaultOptions = {
	duration: 9000,
	variant: 'left-accent',
	isClosable: true,
	position: 'top-right',
};

export enum ToastStatuses {
	info = 'info',
	loading = 'loading',
	warning = 'warning',
	error = 'error',
	success = 'success',
}

export enum ToastDefaultTitles {
	info = 'A quick note.',
	loading = 'Action pending...',
	warning = 'Caution.',
	error = 'An error occurred.',
	success = 'Success!',
}

export enum ToastDefaultDescriptions {
	error = 'Something went wrong. Please try again later.',
}

const BlankToastMessages = {
	success: null,
	error: {},
};

export const CreateUserStandardAuthToastMessages = {
	success: {
		toastStatus: ToastStatuses.success,
		toastDescription: 'Your account has been created!',
	},
	error: {
		409: {
			toastStatus: ToastStatuses.error,
			toastDescription: 'An account with this email already exists.',
		},
	},
};

export const CreateUserSocialAuthToastMessages = {
	success: {
		toastStatus: ToastStatuses.success,
		toastDescription: 'Your account has been created!',
	},
	error: {
		409: {
			toastStatus: ToastStatuses.error,
			toastDescription: 'An account with this email already exists.',
		},
	},
};

export const SignupCreateSessionToastMessages = BlankToastMessages;

export const StandaloneBypassSignupToast = {
	title: ToastDefaultTitles.info,
	description: 'This email is already in use via social auth. Logging you in instead.',
};

export const LoginStandardAuthCreateSessionToastMessages = {
	success: null,
	error: {
		404: {
			toastStatus: ToastStatuses.error,
			toastDescription: 'Unable to find an account with this email.',
		},
		401: {
			toastStatus: ToastStatuses.error,
			toastDescription: 'Invalid email, password or both.',
		},
	},
};

export const LoginSocialAuthCreateSessionToastMessages = BlankToastMessages;

export const StandaloneLoginNewFirebaseUserErrorToast = {
	title: ToastDefaultTitles.error,
	description: 'Unable to find an account with this email. Please sign up instead.',
};

export const JoinHideoutToastMessages = {
	success: {
		toastStatus: ToastStatuses.success,
		toastDescription: "You've successfully joined the hideout!",
	},
	error: {
		404: {
			toastStatus: ToastStatuses.error,
			toastDescription: 'The provided join code is invalid.',
		},
		400: {
			toastStatus: ToastStatuses.error,
			toastDescription: "This hideout's max capacity has been reached.",
		},
	},
};

export const CreateHideoutToastMessages = {
	success: {
		toastStatus: ToastStatuses.success,
		toastDescription: 'Your hideout has been created!',
	},
	error: {},
};

export enum CustomErrorMessages {
	SignupStandardAuthValidationMessage = 'Invalid email or insecure password (passwords must have both cases, numbers and special characters).',
}
