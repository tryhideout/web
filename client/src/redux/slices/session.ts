import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxSliceNames } from 'utils/constants';
import type { RootState, Session, SessionsAPIResponse } from 'utils/types';

const INITIAL_STATE: Session = {
	isLoggedIn: null,
	accessToken: null,
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
		createSession(_state: Session, action: PayloadAction<SessionsAPIResponse>): Session {
			return {
				isLoggedIn: true,
				accessToken: action.payload.access_token,
			};
		},
		refreshSession(_state: Session, action: PayloadAction<SessionsAPIResponse>): Session {
			return { isLoggedIn: true, accessToken: action.payload.access_token };
		},
		endSession(_state: Session, _action: PayloadAction<undefined>): Session {
			return INITIAL_STATE;
		},
	},
});

export const { createSession, refreshSession, endSession } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export default sessionSlice.reducer;
