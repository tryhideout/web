import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import usersAPI from '@/redux/api/users';
import { ReduxSliceNames } from '@/utils/constants';
import type { User, UsersAPIResponse } from '@/utils/types';

const INITIAL_STATE: User = {
	id: null,
	email: null,
	firstName: null,
	lastName: null,
	color: null,
	hideoutID: null,
	status: null,
};

const loadUsersAPIResponse = (state: User, action: PayloadAction<UsersAPIResponse>): User => {
	return {
		...state,
		id: action.payload.id,
		email: action.payload.email,
		firstName: action.payload.first_name,
		lastName: action.payload.last_name,
		color: action.payload.color,
		hideoutID: action.payload.hideout_id,
		status: action.payload.status,
	};
};

const userSlice = createSlice({
	name: ReduxSliceNames.USER,
	initialState: INITIAL_STATE,
	reducers: {
		getUser: loadUsersAPIResponse,
	},
	extraReducers: (builder) => {
		builder.addMatcher(usersAPI.endpoints.getUser.matchFulfilled, loadUsersAPIResponse);
		builder.addMatcher(usersAPI.endpoints.createUser.matchFulfilled, loadUsersAPIResponse);
	},
});

export default userSlice.reducer;
