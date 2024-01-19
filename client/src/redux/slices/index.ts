import userReducer from 'redux/slices/user';
import hideoutReducer from 'redux/slices/hideout';
import sessionReducer from 'redux/slices/session';
import { coreAPI } from 'redux/api/core';
import { combineReducers } from '@reduxjs/toolkit';

console.log('RAN 0');
const rootReducer = combineReducers({
	user: userReducer,
	hideout: hideoutReducer,
	session: sessionReducer,
	[coreAPI.reducerPath]: coreAPI.reducer,
});
console.log('RAN 1');

export default rootReducer;
