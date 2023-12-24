import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, User, UserAPIResponse } from 'utils/types';

const INITIAL_STATE: User = {
	id: null,
	email: null,
	firstName: null,
	lastName: null,
	hideoutID: null,
	color: null,
};

const loadUserAPIResponse = (state: User, action: PayloadAction<UserAPIResponse>): User => {
	return {
		...state,
		id: action.payload.id,
		email: action.payload.email,
		firstName: action.payload.first_name,
		lastName: action.payload.last_name,
		hideoutID: action.payload.hideout_id,
		color: action.payload.color,
	};
};

const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		loadUser: loadUserAPIResponse,
		createUser: loadUserAPIResponse,
	},
});

export const { loadUser, createUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
