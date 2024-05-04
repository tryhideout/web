import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxSliceNames } from '@/utils/constants';
import type { HideoutsAPIResponse, Hideout, RootState } from '@/utils/types';
import hideoutsAPI from '@/redux/api/hideouts';

const INITIAL_STATE: Hideout = {
	id: null,
	name: null,
	ownerID: null,
	joinCode: null,
};

const loadHideoutsAPIResponse = (state: Hideout, action: PayloadAction<HideoutsAPIResponse>): Hideout => {
	return {
		...state,
		id: action.payload.id,
		name: action.payload.name,
		ownerID: action.payload.owner_id,
		joinCode: action.payload.join_code,
	};
};

const hideoutSlice = createSlice({
	name: ReduxSliceNames.HIDEOUT,
	initialState: INITIAL_STATE,
	reducers: {
		getHideout: loadHideoutsAPIResponse,
		createHideout: loadHideoutsAPIResponse,
	},
	extraReducers: (builder) => {
		builder.addMatcher(hideoutsAPI.endpoints.getHideout.matchFulfilled, loadHideoutsAPIResponse);
		builder.addMatcher(hideoutsAPI.endpoints.createHideout.matchFulfilled, loadHideoutsAPIResponse);
		builder.addMatcher(hideoutsAPI.endpoints.joinHideout.matchFulfilled, loadHideoutsAPIResponse);
	},
});

export const { getHideout } = hideoutSlice.actions;

export const selectHideout = (state: RootState) => state.hideout;

export default hideoutSlice.reducer;
