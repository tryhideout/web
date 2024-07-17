import userReducer from '@/redux/slices/user';
import hideoutReducer from '@/redux/slices/hideout';
import sessionReducer from '@/redux/slices/session';
import choresReducer from '@/redux/slices/chores';
import expensesReducer from '@/redux/slices/expenses';
import { coreAPI } from '@/redux/api/core';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
	hideout: hideoutReducer,
	session: sessionReducer,
	chores: choresReducer,
	expenses: expensesReducer,
	[coreAPI.reducerPath]: coreAPI.reducer,
});

export default rootReducer;
