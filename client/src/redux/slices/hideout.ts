import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxSliceNames } from 'utils/constants';
import type { HideoutsAPIResponse, Hideout, RootState } from 'utils/types';

const INITIAL_STATE: Hideout = {
	id: null,
	name: null,
	ownerID: null,
	joinCode: null,
};

const hideoutSlice = createSlice({
	name: ReduxSliceNames.HIDEOUT,
	initialState: INITIAL_STATE,
	reducers: {
		loadHideout(state: Hideout, action: PayloadAction<HideoutsAPIResponse>): Hideout {
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
