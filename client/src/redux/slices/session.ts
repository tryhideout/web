import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxSliceNames } from '@/utils/constants';
import type { Session, SessionsAPIResponse } from '@/utils/types';

const INITIAL_STATE: Session = {
	isLoggedIn: null,
	accessToken: null,
	userID: null,
};

const loadSessionAPIResponse = (_state: Session, action: PayloadAction<SessionsAPIResponse>): Session => {
	return { isLoggedIn: true, accessToken: action.payload.access_token, userID: action.payload.user_id };
};

const sessionSlice = createSlice({
	name: ReduxSliceNames.SESSION,
	initialState: INITIAL_STATE,
	reducers: {
		verifySession(state: Session, action: PayloadAction<{ isLoggedIn: boolean }>): Session {
			return {
				...state,
				isLoggedIn: action.payload.isLoggedIn,
				accessToken: action.payload.isLoggedIn ? state.accessToken : null,
			};
		},
		createSession: loadSessionAPIResponse,
		refreshSession: loadSessionAPIResponse,
		endSession(_state: Session, _action: PayloadAction<undefined>): Session {
			return INITIAL_STATE;
		},
	},
});

export const { verifySession, createSession, refreshSession, endSession } = sessionSlice.actions;

export default sessionSlice.reducer;
