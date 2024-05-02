import { CreateToastFnReturn, UseToastOptions } from '@chakra-ui/react';
import { ToastDefaultTitles, ToastStatuses } from '@/utils/constants';
import { APIResponseError, APIResponses, RequestToastMessages } from '@/utils/types';

/**
 * Description placeholder
 *
 * @class APIRequestHandler
 * @typedef {APIRequestHandler}
 */
class APIRequestHandler {
	/**
	 * Description placeholder
	 *
	 * @type {CreateToastFnReturn}
	 */
	toastFn: CreateToastFnReturn;

	/**
	 * Creates an instance of APIRequestHandler.
	 *
	 * @constructor
	 * @param {CreateToastFnReturn} toastFn
	 */
	constructor(toastFn: CreateToastFnReturn) {
		this.toastFn = toastFn;
	}

	/**
	 * Description placeholder
	 *
	 * @param {Promise<APIResponses>} promise
	 * @param {RequestToastMessages} toastMessages
	 * @param {(error: APIResponseError) => {}} [onCatchFn]
	 * @returns {(APIResponses | void)}
	 */
	awaitAndToastRequest = async (
		promise: Promise<APIResponses>,
		toastMessages: RequestToastMessages,
		onCatchFn?: (error: APIResponseError) => {},
	): Promise<APIResponses | void> => {
		return promise
			.then((payload) => {
				if (toastMessages.success !== null) {
					const toastStatus = toastMessages.success.toastStatus;
					const toastOptions: UseToastOptions = {
						title: ToastDefaultTitles[toastStatus as keyof typeof ToastDefaultTitles],
						description: toastMessages.success.toastDescription,
						status: ToastStatuses.success,
					};
					this.toastFn(toastOptions);
				}
				return payload;
			})
			.catch((error: APIResponseError) => {
				const toastOptions: UseToastOptions = {
					title:
						error.status in toastMessages.error
							? ToastDefaultTitles[toastMessages.error[error.status].toastStatus]
							: ToastDefaultTitles.error,
					description:
						error.status in toastMessages.error ? toastMessages.error[error.status].toastDescription : error.data.error,
					status: error.status in toastMessages.error ? toastMessages.error[error.status].toastStatus : ToastStatuses.error,
				};
				this.toastFn(toastOptions);

				if (onCatchFn !== undefined) onCatchFn(error);
				throw new Error();
			});
	};
}

export default APIRequestHandler;
