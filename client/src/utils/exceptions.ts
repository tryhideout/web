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

export const catchify = async (func: Function, ...args: any[]) => {
	try {
		await func(...args);
	} catch (error) {
		console.log(error);
		if (error instanceof CustomError) {
			error.toast();
		} else {
			const rtkQueryError = new CustomError((error as APIResponseError).data.error);
			rtkQueryError.toast();
		}
	}
};
