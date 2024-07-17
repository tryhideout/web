import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { CreateToastFnReturn, UseToastOptions } from '@chakra-ui/react';

import usersAPI from '@/redux/api/users';
import sessionsAPI from '@/redux/api/sessions';
import { ToastDefaultTitles, ToastStatuses } from '@/utils/constants';
import {
	APIResponseError,
	APIResponses,
	RequestHandlerRefreshOptions,
	RequestToastMessages,
	Session,
	SessionsAPIResponse,
} from '@/utils/types';
import store from '@/main';
import { refreshSession } from '@/redux/slices/session';

/**
 * Handles and toasts all API requests using promises sourced from RTK Query
 * @class APIRequestHandler
 * @typedef {APIRequestHandler}
 */
class APIRequestHandler {
	/**
	 * A callable toast function sourced from a useToast call, used to trigger toast UI on success / error.
	 * @type {CreateToastFnReturn}
	 */
	toastFn: CreateToastFnReturn;

	/**
	 * A callable dispatch function sourced from a useDispatch call, used to dispatch refreshSession actions.
	 * @type {CreateToastFnReturn}
	 */
	dispatchFn: Dispatch<UnknownAction>;

	/**
	 * @constructor
	 * @param {CreateToastFnReturn} toastFn
	 */
	constructor(toastFn: CreateToastFnReturn, dispatchFn: Dispatch<UnknownAction>) {
		this.toastFn = toastFn;
		this.dispatchFn = dispatchFn;
	}

	/**
	 * Calls and catches the given promise, showing the provided toast messages on success / error.
	 * Calls onCatchFn inside catch block if parameter provided.
	 * @param {Promise<APIResponses>} promise
	 * @param {RequestToastMessages} toastMessages
	 * @param {(error: APIResponseError) => {}} [onCatchFn]
	 * @returns {(APIResponses | void)}
	 */
	awaitAndToastRequest = async (
		promise: Promise<APIResponses | void>,
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
			.catch(async (error: APIResponseError) => {
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

				if (onCatchFn !== undefined) await onCatchFn(error);
				throw new Error();
			});
	};

	/**
	 * Refreshes the current session and user data by manually dispatching queries through RTK Query.
	 * @async
	 * @param {User} currentUser - The current User state object from the redux store.
	 */
	refreshUserAndSessionState = async (session: Session, options?: RequestHandlerRefreshOptions) => {
		if (!options?.skipSessionRefresh) {
			const responsePayload = (await store
				.dispatch(sessionsAPI.endpoints.refreshSession.initiate())
				.unwrap()) as SessionsAPIResponse;
			this.dispatchFn(refreshSession(responsePayload));
		}

		if (!options?.skipUserRefresh) await store.dispatch(usersAPI.endpoints.getUser.initiate(session.userID!)).unwrap();
	};
}

export default APIRequestHandler;
