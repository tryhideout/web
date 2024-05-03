import { coreAPI } from '@/redux/api/core';
import { APIPaths, HTTPRequestMethods, ReduxTagTypes } from '@/utils/constants';
import { formatAPIPath } from '@/utils/helpers/common';
import { HideoutsAPIRequest, HideoutsAPIResponse } from '@/utils/types';

const extendedAPI = coreAPI.injectEndpoints({
	endpoints: (builder) => ({
		getHideout: builder.query<HideoutsAPIResponse, number>({
			query: (hideoutID) => ({ url: formatAPIPath([APIPaths.SESSIONS_PATH, hideoutID]) }),
			providesTags: [ReduxTagTypes.HIDEOUT],
		}),
		createHideout: builder.mutation<HideoutsAPIResponse, HideoutsAPIRequest>({
			query: (body) => ({ url: APIPaths.HIDEOUTS_PATH, method: HTTPRequestMethods.POST, body }),
			invalidatesTags: [ReduxTagTypes.HIDEOUT, ReduxTagTypes.USER, ReduxTagTypes.SESSION],
		}),
		joinHideout: builder.mutation<void, { join_code: string }>({
			query: ({ join_code }) => ({
				url: formatAPIPath([APIPaths.HIDEOUTS_PATH, APIPaths.USERS_PATH]),
				method: HTTPRequestMethods.POST,
				body: { join_code },
				responseHandler: 'text',
			}),
			invalidatesTags: [ReduxTagTypes.HIDEOUT, ReduxTagTypes.SESSION, ReduxTagTypes.USER],
		}),
		leaveHideout: builder.mutation<void, number>({
			query: (hideoutID) => ({
				url: formatAPIPath([APIPaths.HIDEOUTS_PATH, hideoutID, APIPaths.USERS_PATH]),
				method: HTTPRequestMethods.DELETE,
				responseHandler: 'text',
			}),
			invalidatesTags: [ReduxTagTypes.HIDEOUT, ReduxTagTypes.SESSION, ReduxTagTypes.USER],
		}),
	}),
});

export const { useGetHideoutQuery, useCreateHideoutMutation, useJoinHideoutMutation, useLeaveHideoutMutation } = extendedAPI;
export default extendedAPI;
