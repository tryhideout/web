import { CustomError } from '@/utils/exceptions';

/**
 * Generates an API path string using the provided string & number argument list.
 * @param {(string | number)[]} args - list of strings / numbers to be formatted into the API path.
 * @returns {string}
 */
export const formatAPIPath = (args: (string | number)[]): string => {
	let formattedURL = '';
	args.forEach((arg) => {
		const stringArg = arg.toString();
		formattedURL = formattedURL + (stringArg.startsWith('/') ? stringArg : '/' + stringArg);
	});
	return formattedURL.startsWith('/') ? formattedURL : '/' + formattedURL;
};

/**
 * Generates an empty object with the provided string keys mapping to empty strings
 * @param {string[]} keys - list of string keys to be used in the object.
 * @returns {object}
 */
export const generateEmptyStringObject = (keys: string[]): object => {
	return keys.reduce((o, key) => ({ ...o, [key]: '' }), {});
};

/**
 * Calls the provided function based on the given arguments.
 * Catches any resulting errors and toasts if possible, throwing an empty Error object to break control flow.
 * @async
 * @param {Function} func - the function to be called.
 * @param {...any[]} args - any number of arguments to call the function with.
 * @throws {Error}
 */
export const catchify = async (func: CallableFunction, ...args: any[]) => {
	try {
		await func(...args);
	} catch (error) {
		if (error instanceof CustomError) {
			error.toast();
		}
		if (import.meta.env.DEV) console.error(error);
		throw new Error();
	}
};
