import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import expensesAPI from '@/redux/api/expenses';
import { ReduxSliceNames } from '@/utils/constants';
import type { Expense, ExpensesAPIResponse, ExpensesReduxStore } from '@/utils/types';

const INITIAL_STATE: ExpensesReduxStore = {};

const loadSingularExpense = (expense: ExpensesAPIResponse): Expense => {
	return {
		id: expense.id,
		name: expense.name,
		amount: expense.amount,
		dueDate: expense.due_date,
		debtorID: expense.debtor_id,
		creditorID: expense.creditor_id,
		hideoutID: expense.hideout_id,
		comments: expense.comments,
		active: expense.active,
	};
};

const loadHideoutExpensesAPIResponse = (
	_: ExpensesReduxStore,
	action: PayloadAction<ExpensesAPIResponse[]>,
): ExpensesReduxStore => {
	const updatedState: ExpensesReduxStore = {};
	action.payload.forEach((expense) => (updatedState[expense.id] = loadSingularExpense(expense)));
	return updatedState;
};

const updateByExpensesAPIResponse = (
	state: ExpensesReduxStore,
	action: PayloadAction<ExpensesAPIResponse>,
): ExpensesReduxStore => {
	return {
		...state,
		[action.payload.id]: loadSingularExpense(action.payload),
	};
};

const deleteByExpenseID = (state: ExpensesReduxStore, action: PayloadAction<{ id: number }>) => {
	const filteredState: ExpensesReduxStore = {};
	(Object.keys(state) as Array<unknown> as Array<keyof ExpensesReduxStore>).forEach((expenseID) => {
		if (expenseID !== action.payload.id) {
			filteredState[expenseID] = state[expenseID];
		}
	});
	return filteredState;
};

const expensesSlice = createSlice({
	name: ReduxSliceNames.EXPENSES,
	initialState: INITIAL_STATE,
	reducers: {
		deleteExpense: deleteByExpenseID,
	},
	extraReducers: (builder) => {
		builder.addMatcher(expensesAPI.endpoints.createExpense.matchFulfilled, updateByExpensesAPIResponse);
		builder.addMatcher(expensesAPI.endpoints.getExpense.matchFulfilled, updateByExpensesAPIResponse);
		builder.addMatcher(expensesAPI.endpoints.updateExpense.matchFulfilled, updateByExpensesAPIResponse);
		builder.addMatcher(expensesAPI.endpoints.getAllExpensesByHideout.matchFulfilled, loadHideoutExpensesAPIResponse);
	},
});

export default expensesSlice.reducer;
