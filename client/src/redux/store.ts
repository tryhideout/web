import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '@/redux/slices';
import { coreAPI } from '@/redux/api/core';

const middleware = [thunk, logger];

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coreAPI.middleware).concat(middleware),
});
