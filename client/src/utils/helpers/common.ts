import { CustomError } from '@/utils/exceptions';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export const catchify = async (func: Function, ...args: any[]) => {
	try {
		await func(...args);
	} catch (error) {
		if (error instanceof CustomError) {
			error.toast();
		}
		if (import.meta.env.DEV) console.error(error);
	}
};
