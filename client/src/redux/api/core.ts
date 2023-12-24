import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'utils/types';
import { UNAUTHORIZED_STATUS_CODE } from 'utils/constants';
import axios from 'axios';
import { endAuthSession, refreshAuthSession } from 'redux/slices/authSlice';

type baseQueryReturnType = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_SERVER_URL + '/api',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken;
		if (token) headers.set('Authorization', `Bearer ${token}`);
		return headers;
	},
});

const baseQueryWithReAuth: baseQueryReturnType = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === UNAUTHORIZED_STATUS_CODE) {
		try {
			const refreshTokenResult = await axios.put('/sessions', {}, { withCredentials: true });
			api.dispatch(refreshAuthSession(refreshTokenResult.data));
			result = await baseQuery(args, api, extraOptions);
		} catch (err) {
			api.dispatch(endAuthSession());
		}
	}
	return result;
};

export const coreAPI = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['User', 'Hideout', 'Chores', 'Expenses'],
	endpoints: () => ({}),
});
