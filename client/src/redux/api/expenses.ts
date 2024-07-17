import { coreAPI } from '@/redux/api/core';
import { APIPaths, HTTPRequestMethods, ReduxTagTypes } from '@/utils/constants';
import { formatAPIPath } from '@/utils/helpers/common';
import { ExpensesAPIResponse, ExpensesAPIRequest } from '@/utils/types';

const extendedAPI = coreAPI.injectEndpoints({
	endpoints: (builder) => ({
		getExpense: builder.query<ExpensesAPIResponse, number>({
			query: (expenseID) => ({ url: formatAPIPath([APIPaths.EXPENSES_PATH, expenseID]) }),
		}),
		createExpense: builder.mutation<ExpensesAPIResponse, ExpensesAPIRequest>({
			query: (body) => ({ url: APIPaths.EXPENSES_PATH, method: HTTPRequestMethods.POST, body }),
		}),
		updateExpense: builder.mutation<ExpensesAPIResponse, ExpensesAPIResponse>({
			query: (body) => ({ url: formatAPIPath([APIPaths.EXPENSES_PATH, body.id]), method: HTTPRequestMethods.PUT, body }),
		}),
		deleteExpense: builder.mutation<void, number>({
			query: (expenseID) => ({
				url: formatAPIPath([APIPaths.EXPENSES_PATH, expenseID]),
				method: HTTPRequestMethods.DELETE,
				responseHandler: 'text',
			}),
		}),
		getAllExpensesByHideout: builder.query<ExpensesAPIResponse[], number>({
			query: (hideoutID) => ({ url: formatAPIPath([APIPaths.HIDEOUTS_PATH, hideoutID, APIPaths.EXPENSES_PATH]) }),
			providesTags: [ReduxTagTypes.EXPENSES],
		}),
	}),
});

export const {
	useGetExpenseQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
	useGetAllExpensesByHideoutQuery,
} = extendedAPI;
export default extendedAPI;
