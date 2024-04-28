import { User } from 'firebase/auth';
import { CustomError } from '@/utils/exceptions';
import { SignupFormState } from '@/utils/types';

const FormRegex = {
	EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
	PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};

const standardAuthCreateUserRequest = (formState: SignupFormState) => {
	if (!(FormRegex.EMAIL.test(formState.email) && FormRegex.PASSWORD.test(formState.password)))
		throw new CustomError('Invalid email, insecure password or unmatching confirm field.');

	return {
		email: formState.email,
		password: formState.password,
		first_name: formState.firstName,
		last_name: formState.lastName,
	};
};

const socialAuthCreateUserRequest = (currentUser: User, socialToken: string) => ({
	email: currentUser.email!,
	first_name: currentUser.displayName!.split(' ')[0],
	last_name: currentUser.displayName!.split(' ')[1] || '',
	social_token: socialToken,
});

const standardAuthCreateSessionRequest = (formState: SignupFormState) => ({
	email: formState.email,
	password: formState.password,
});

const socialAuthCreateSessionRequest = (currentUser: User, socialToken: string) => ({
	email: currentUser.email!,
	social_token: socialToken,
});

const adapters = {
	standardAuthCreateUserRequest,
	socialAuthCreateUserRequest,
	standardAuthCreateSessionRequest,
	socialAuthCreateSessionRequest,
};

export default adapters;
