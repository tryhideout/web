import { coreAPI } from '@/redux/api/core';
import { APIPaths, HTTPRequestMethods, ReduxTagTypes } from '@/utils/constants';
import { formatAPIPath } from '@/utils/helpers/common';
import { ChoresAPIResponse, ChoresAPIRequest } from '@/utils/types';

const extendedAPI = coreAPI.injectEndpoints({
	endpoints: (builder) => ({
		getChore: builder.query<ChoresAPIResponse, number>({
			query: (choreID) => ({ url: formatAPIPath([APIPaths.CHORES_PATH, choreID]) }),
		}),
		createChore: builder.mutation<ChoresAPIResponse, ChoresAPIRequest>({
			query: (body) => ({ url: APIPaths.CHORES_PATH, method: HTTPRequestMethods.POST, body }),
		}),
		updateChore: builder.mutation<ChoresAPIResponse, ChoresAPIResponse>({
			query: (body) => ({ url: formatAPIPath([APIPaths.CHORES_PATH, body.id]), method: HTTPRequestMethods.PUT, body }),
		}),
		deleteChore: builder.mutation<void, number>({
			query: (choreID) => ({ url: formatAPIPath([APIPaths.CHORES_PATH, choreID]), method: HTTPRequestMethods.DELETE }),
		}),
		getAllChoresByHideout: builder.query<ChoresAPIResponse[], number>({
			query: (hideoutID) => ({ url: formatAPIPath([APIPaths.HIDEOUTS_PATH, hideoutID, APIPaths.CHORES_PATH]) }),
			providesTags: [ReduxTagTypes.CHORES],
		}),
	}),
});

export const { useGetChoreQuery, useCreateChoreMutation, useUpdateChoreMutation } = extendedAPI;
export default extendedAPI;
