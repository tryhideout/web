import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	AuthProvider,
	getAdditionalUserInfo,
	User,
	deleteUser,
} from 'firebase/auth';

import { FirebaseProviderID } from 'utils/types';
import { AuthProviderIDs, ProviderScopes } from 'utils/constants';
import { FirebaseError } from 'firebase/app';

import { FormRegex } from 'utils/constants';
import { CustomError } from 'utils/exceptions';

interface SignupFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const adaptSignupForm = (inputState: SignupFormData) => {
	if (!(FormRegex.EMAIL.test(inputState.email) && FormRegex.PASSWORD.test(inputState.password)))
		throw new CustomError('Invalid email, insecure password or unmatching confirm field.');

	return {
		email: inputState.email,
		password: inputState.password,
		first_name: inputState.firstName,
		last_name: inputState.lastName,
	};
};

const generateFirebaseProvider = (providerID: FirebaseProviderID): AuthProvider => {
	let provider;
	switch (providerID) {
		case AuthProviderIDs.GOOGLE:
			provider = new GoogleAuthProvider();
			break;
		case AuthProviderIDs.FACEBOOK:
			provider = new FacebookAuthProvider();
			break;
		default:
			provider = new GithubAuthProvider();
	}
	provider.addScope(ProviderScopes[providerID].EMAIL);
	provider.addScope(ProviderScopes[providerID].PROFILE);
	return provider;
};

/* TODO: change this file into only basic form adapting functions, create a separate services file
for all firebase related stuff */

export const adaptSocialAuth = async (providerID: FirebaseProviderID) => {
	const auth = getAuth();
	const provider = generateFirebaseProvider(providerID);
	try {
		const result = await signInWithPopup(auth, provider);
		const currentUser = result.user;
		const additionalInfo = getAdditionalUserInfo(result);

		const socialToken = await currentUser.getIdToken();

		const requestBody = {
			email: currentUser.email!,
			first_name: currentUser.displayName!.split(' ')[0],
			last_name: currentUser.displayName!.split(' ')[1] || '',
			social_token: socialToken,
		};

		return { currentUser, isNewUser: additionalInfo?.isNewUser, requestBody };
	} catch (error) {
		throw new CustomError((error as FirebaseError).code);
	}
};

export const deleteUserByEntity = async (user: User) => {
	await deleteUser(user);
};
