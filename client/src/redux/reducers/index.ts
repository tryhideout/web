import userReducer from 'redux/reducers/userReducer';
import hideoutReducer from 'redux/reducers/hideoutReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
	hideout: hideoutReducer,
});

export default rootReducer;
