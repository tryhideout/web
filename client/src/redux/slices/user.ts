import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import usersAPI from 'redux/api/users';
import { ReduxSliceNames } from 'utils/constants';
import type { RootState, User, UsersAPIResponse } from 'utils/types';

const INITIAL_STATE: User = {
	id: null,
	email: null,
	firstName: null,
	lastName: null,
	color: null,
};

const loadUsersAPIResponse = (state: User, action: PayloadAction<UsersAPIResponse>): User => {
	return {
		...state,
		id: action.payload.id,
		email: action.payload.email,
		firstName: action.payload.first_name,
		lastName: action.payload.last_name,
		color: action.payload.color,
	};
};

const userSlice = createSlice({
	name: ReduxSliceNames.USER,
	initialState: INITIAL_STATE,
	reducers: {
		loadUser: loadUsersAPIResponse,
		createUser: loadUsersAPIResponse,
	},
	extraReducers: (builder) => {
		builder.addMatcher(usersAPI.endpoints.getUser.matchFulfilled, loadUsersAPIResponse);
		builder.addMatcher(usersAPI.endpoints.createUser.matchFulfilled, loadUsersAPIResponse);
	},
});

export const { loadUser, createUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
