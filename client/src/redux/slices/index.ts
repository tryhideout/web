import userReducer from 'redux/slices/userSlice';
import hideoutReducer from 'redux/slices/hideoutSlice';
import authReducer from 'redux/slices/authSlice';
import { coreAPI } from 'redux/api/core';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
	hideout: hideoutReducer,
	auth: authReducer,
	[coreAPI.reducerPath]: coreAPI.reducer,
});

export default rootReducer;
