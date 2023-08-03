import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: null,
	first_name: null,
	last_name: null,
	hideout_id: null,
	email: null,
	password: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			return {...state, ...action.payload};
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
