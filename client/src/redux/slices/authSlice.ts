import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, Auth, AuthAPIResponse } from 'utils/types';

const INITIAL_STATE: Auth = {
	isLoggedIn: null,
	accessToken: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState: INITIAL_STATE,
	reducers: {
		newAuthSession(state: Auth, action: PayloadAction<AuthAPIResponse>) {
			return {
				...state,
				isLoggedIn: true,
				accessToken: action.payload.access_token,
			};
		},
		refreshAuthSession(state: Auth, action: PayloadAction<AuthAPIResponse>) {
			return { ...state, accessToken: action.payload.access_token };
		},
		endAuthSession(_state: Auth, _action: PayloadAction<undefined>): Auth {
			return INITIAL_STATE;
		},
	},
});

export const { newAuthSession, refreshAuthSession, endAuthSession } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
