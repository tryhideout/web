import { coreAPI } from 'redux/api/core';
import { APIPaths, HTTPRequestMethods, ReduxTagTypes } from 'utils/constants';
import { formatAPIPath } from 'utils/helpers/common';
import { HideoutsAPIRequest, HideoutsAPIResponse } from 'utils/types';

const extendedAPI = coreAPI.injectEndpoints({
	endpoints: (builder) => ({
		getHideout: builder.query<HideoutsAPIResponse, string>({
			query: (hideoutID) => ({ url: formatAPIPath([APIPaths.SESSIONS_PATH, hideoutID]) }),
			providesTags: [ReduxTagTypes.HIDEOUT],
		}),

		createHideout: builder.mutation<HideoutsAPIRequest, HideoutsAPIResponse>({
			query: (body) => ({ url: APIPaths.SESSIONS_PATH, method: HTTPRequestMethods.POST, body }),
		}),

		joinHideout: builder.mutation<,
	}),
});
