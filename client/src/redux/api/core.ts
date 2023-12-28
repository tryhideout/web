import axios from 'axios';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { endSession, refreshSession } from 'redux/slices/session';
import { APIPaths, HTTPStatusCodes, ReduxTagTypes } from 'utils/constants';
import { RootState } from 'utils/types';
type baseQueryReturnType = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_SERVER_URL + APIPaths.BASE_PATH,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).session.accessToken;
		if (token) headers.set('Authorization', `Bearer ${token}`);
		return headers;
	},
});

const baseQueryWithReAuth: baseQueryReturnType = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === HTTPStatusCodes.UNAUTHORIZED) {
		try {
			const refreshTokenResult = await axios.get(
				process.env.REACT_APP_SERVER_URL + APIPaths.SESSIONS_PATH + APIPaths.TOKEN_PATH,
				{
					withCredentials: true,
				},
			);
			api.dispatch(refreshSession(refreshTokenResult.data));
		} catch (err) {
			api.dispatch(endSession());
		}
		result = await baseQuery(args, api, extraOptions);
	}
	return result;
};

export const coreAPI = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: [
		ReduxTagTypes.SESSION,
		ReduxTagTypes.USER,
		ReduxTagTypes.HIDEOUT,
		ReduxTagTypes.EXPENSES,
		ReduxTagTypes.CHORES,
	],
	endpoints: () => ({}),
});
