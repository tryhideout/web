import { coreAPI } from 'redux/api/core';
import { FETCH_CREDENTIALS_INCLUDE, APIPaths, HTTPRequestMethods, ReduxTagTypes } from 'utils/constants';
import { formatAPIPath } from 'utils/helpers/common';
import { SessionsAPIEmailLoginRequest, SessionsAPIResponse, SessionsAPISocialLoginRequest } from 'utils/types';

const extendedAPI = coreAPI.injectEndpoints({
	endpoints: (builder) => ({
		verifySession: builder.query<void, void>({
			query: () => ({ url: APIPaths.SESSIONS_PATH, credentials: FETCH_CREDENTIALS_INCLUDE }),
		}),

		createSession: builder.mutation<SessionsAPIResponse, SessionsAPIEmailLoginRequest | SessionsAPISocialLoginRequest>({
			query: (body) => ({ url: APIPaths.SESSIONS_PATH, method: HTTPRequestMethods.POST, body }),
		}),

		refreshSession: builder.query<SessionsAPIResponse, void>({
			query: () => ({
				url: APIPaths.SESSIONS_PATH + APIPaths.TOKEN_PATH,
				credentials: FETCH_CREDENTIALS_INCLUDE,
			}),
			providesTags: [ReduxTagTypes.SESSION],
		}),

		endSession: builder.mutation<void, void>({
			query: () => ({ url: APIPaths.SESSIONS_PATH, method: HTTPRequestMethods.DELETE }),
			invalidatesTags: [ReduxTagTypes.SESSION],
		}),
	}),
});

export const { useVerifySessionQuery, useCreateSessionMutation, useRefreshSessionQuery, useEndSessionMutation } =
	extendedAPI;
