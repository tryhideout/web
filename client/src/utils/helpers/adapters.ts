import { User as FirebaseUser } from 'firebase/auth';
import { CustomError } from '@/utils/exceptions';
import {
	HideoutsAPIRequest,
	OnboardingCreateFormState,
	OnboardingJoinFormState,
	SessionsAPIEmailLoginRequest,
	SessionsAPISocialLoginRequest,
	SignupFormState,
	User,
	UsersAPIRequest,
} from '@/utils/types';
import { CustomErrorMessages, FormRegex } from '@/utils/constants';

/**
 * Generates POST /users request body for standard auth; Throws CustomError if email / password regex fail.
 * @param {SignupFormState} formState - Component state to use in generating request body.
 * @returns {UsersAPIRequest}
 * @throws {CustomError}
 */
const standardAuthCreateUserRequest = (formState: SignupFormState): UsersAPIRequest => {
	if (!(FormRegex.EMAIL.test(formState.email) && FormRegex.PASSWORD.test(formState.password)))
		throw new CustomError(CustomErrorMessages.SignupStandardAuthValidationMessage);

	return {
		email: formState.email,
		password: formState.password,
		first_name: formState.firstName,
		last_name: formState.lastName,
	};
};

/**
 * Generates POST /users request body for social auth flow.
 * @param {FirebaseUser} currentFirebaseUser - Firebase current user's object to source details from.
 * @param {string} socialToken - Token sourced from successful Firebase auth flow attempt.
 * @returns {UsersAPIRequest}
 */
const socialAuthCreateUserRequest = (currentFirebaseUser: FirebaseUser, socialToken: string): UsersAPIRequest => ({
	email: currentFirebaseUser.email!,
	first_name: currentFirebaseUser.displayName!.split(' ')[0],
	last_name: currentFirebaseUser.displayName!.split(' ')[1] || '',
	social_token: socialToken,
});

/**
 * Generates POST /sessions request body for standard auth flow.
 * @param {SignupFormState} formState - Component state to use in generating request body.
 * @returns {{ email: any; password: any; }}
 */
const standardAuthCreateSessionRequest = (formState: SignupFormState): SessionsAPIEmailLoginRequest => ({
	email: formState.email,
	password: formState.password,
});

/**
 * Generates POST /users request body for social auth flow.
 * @param {FirebaseUser} currentFirebaseUser - Firebase current user's object to source details from.
 * @param {string} socialToken - Token sourced from successful Firebase auth flow attempt.
 * @returns {{ email: any; social_token: string; }}
 */
const socialAuthCreateSessionRequest = (
	currentFirebaseUser: FirebaseUser,
	socialToken: string,
): SessionsAPISocialLoginRequest => ({
	email: currentFirebaseUser.email!,
	social_token: socialToken,
});

/**
 * Generates POST /hideouts/users request body for join hideout flow.
 * @param {OnboardingJoinFormState} formState - Component state to use in generating request body.
 * @returns {{ join_code: string; }}
 */
const onboardingJoinHideoutRequest = (formState: OnboardingJoinFormState) => ({
	join_code: formState.joinCode,
});

/**
 * Generates POST /hideouts/ request body for create hideout flow.
 * @param {OnboardingJoinFormState} formState - Component state to use in generating request body.
 * @param {User} currentUser - The current User state object from the redux store.
 * @returns {HideoutsAPIRequest}
 */
const onboardingCreateHideoutRequest = (formState: OnboardingCreateFormState, currentUser: User): HideoutsAPIRequest => ({
	name: formState.hideoutName,
	owner_id: currentUser.id!,
});

const adapters = {
	standardAuthCreateUserRequest,
	socialAuthCreateUserRequest,
	standardAuthCreateSessionRequest,
	socialAuthCreateSessionRequest,
	onboardingJoinHideoutRequest,
	onboardingCreateHideoutRequest,
};

export default adapters;
