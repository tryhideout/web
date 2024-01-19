import toast from 'utils/helpers/toast';
import { APIResponseError } from 'utils/types';

export class CustomError extends Error {
	body: string;

	constructor(body: string) {
		super();
		this.body = body;
		this.name = 'CustomError';
	}

	toast() {
		const DEFAULT_TITLE = 'An error occurred.';
		toast.error(DEFAULT_TITLE, this.body);
	}
}

export const toastifyError = (error: Error | APIResponseError) => {
	if (error instanceof CustomError) {
		error.toast();
	} else {
		const rtkQueryError = new CustomError((error as APIResponseError).data.error);
		rtkQueryError.toast();
	}
};

export const errorBoundary = async (func: Function, ...args: any[]) => {
	try {
		await func(...args);
	} catch (error) {
		toastifyError(error);
	}
};
