import { CustomError } from 'utils/exceptions';
import { APIResponseError } from 'utils/types';

export const formatAPIPath = (args: (string | number)[]): string => {
	let formattedURL = '';
	args.forEach((arg) => {
		const stringArg = arg.toString();
		formattedURL = formattedURL + (stringArg.startsWith('/') ? stringArg : '/' + stringArg);
	});
	return formattedURL.startsWith('/') ? formattedURL : '/' + formattedURL;
};

export const generateEmptyStringObject = (keys: string[]) => {
	return keys.reduce((o, key) => ({ ...o, [key]: '' }), {});
};

export const catchify = async (func: Function, ...args: any[]) => {
	try {
		await func(...args);
	} catch (error) {
		if (error instanceof CustomError) {
			error.toast();
		} else {
			const rtkQueryError = new CustomError((error as APIResponseError).data.error);
			rtkQueryError.toast();
		}
	}
};
