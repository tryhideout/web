import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { HideoutAPIResponse, Hideout, RootState } from 'utils/types';

const INITIAL_STATE: Hideout = {
	id: null,
	name: null,
	ownerID: null,
	joinCode: null,
};

const hideoutSlice = createSlice({
	name: 'hideout',
	initialState: INITIAL_STATE,
	reducers: {
		loadHideout(state: Hideout, action: PayloadAction<HideoutAPIResponse>): Hideout {
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				ownerID: action.payload.owner_id,
				joinCode: action.payload.join_code,
			};
		},
	},
});

export const { loadHideout } = hideoutSlice.actions;

export const selectHideout = (state: RootState) => state.hideout;

export default hideoutSlice.reducer;
