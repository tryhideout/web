import { CreateToastFnReturn } from '@chakra-ui/react';
import { ToastDefaultTitles } from '@/utils/constants';
import { UsersAPIResponse } from '@/utils/types';

class Toast {
	static showCreateUserPromiseToast = (
		toast: CreateToastFnReturn,
		promise: Promise<UsersAPIResponse>,
		{ social }: { social: boolean },
	) => {
		const toastContent = this.#generatePromiseToastContent(
			'Your account has been created.',
			'Creating your account...',
			social
				? 'This email has already been registered by email and password.'
				: 'An account with this email already exists! Please login instead.',
		);
		toast.promise(promise, toastContent);
	};

	static showBypassSignupToast = (toast: CreateToastFnReturn) =>
		toast({
			title: ToastDefaultTitles.INFO,
			description: 'This email is already connected to a provider. Logging you in instead.',
			status: 'info',
		});

	static showJoinHideoutPromiseToast = (toast: CreateToastFnReturn, promise: Promise<void>) => {
		const toastContent = this.#generatePromiseToastContent(
			"Awesome, you've joined the hideout!",
			'Adding you to the hideout...',
			'Invalid hideout code or hideout max capacity reached.',
		);
		toast.promise(promise, toastContent);
	};

	static #generatePromiseToastContent = (successDescription: string, loadingTitle: string, errorDescription: string) => ({
		success: {
			title: ToastDefaultTitles.SUCCESS,
			description: successDescription,
		},
		loading: {
			title: loadingTitle,
		},
		error: {
			title: ToastDefaultTitles.ERROR,
			description: errorDescription,
		},
	});
}

export default Toast;
