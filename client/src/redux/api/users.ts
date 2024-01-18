import { coreAPI } from 'redux/api/core';
import { APIPaths, HTTPRequestMethods, ReduxTagTypes } from 'utils/constants';
import { formatAPIPath } from 'utils/helpers/common';
import { UsersAPIResponse, UsersAPIRequest } from 'utils/types';

const extendedAPI = coreAPI.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<UsersAPIResponse, string>({
			query: (userID) => ({ url: formatAPIPath([APIPaths.USERS_PATH, userID]) }),
			providesTags: [ReduxTagTypes.USER],
		}),
		createUser: builder.mutation<UsersAPIResponse, UsersAPIRequest>({
			query: (body) => ({ url: APIPaths.USERS_PATH, method: HTTPRequestMethods.POST, body }),
		}),
	}),
});

export const { useGetUserQuery, useCreateUserMutation } = extendedAPI;
export default extendedAPI;
