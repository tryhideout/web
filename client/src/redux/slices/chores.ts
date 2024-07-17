import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import choresAPI from '@/redux/api/chores';
import { ReduxSliceNames } from '@/utils/constants';
import type { Chore, ChoresAPIResponse, ChoresReduxStore } from '@/utils/types';

const INITIAL_STATE: ChoresReduxStore = {};

const loadSingularChore = (chore: ChoresAPIResponse): Chore => {
	return {
		id: chore.id,
		name: chore.name,
		description: chore.description,
		dueDate: chore.due_date,
		assigneeID: chore.assignee_id,
		hideoutID: chore.hideout_id,
		status: chore.status,
	};
};

const loadAllHideoutChoresAPIResponse = (
	_: ChoresReduxStore,
	action: PayloadAction<ChoresAPIResponse[]>,
): ChoresReduxStore => {
	const updatedState: ChoresReduxStore = {};
	action.payload.forEach((chore) => (updatedState[chore.id] = loadSingularChore(chore)));
	return updatedState;
};

const updateByChoresAPIResponse = (state: ChoresReduxStore, action: PayloadAction<ChoresAPIResponse>): ChoresReduxStore => {
	return {
		...state,
		[action.payload.id]: loadSingularChore(action.payload),
	};
};

const deleteByChoreID = (state: ChoresReduxStore, action: PayloadAction<{ id: number }>) => {
	const filteredState: ChoresReduxStore = {};
	(Object.keys(state) as Array<unknown> as Array<keyof ChoresReduxStore>).forEach((choreID) => {
		if (choreID !== action.payload.id) {
			filteredState[choreID] = state[choreID];
		}
	});
	return filteredState;
};

const choresSlice = createSlice({
	name: ReduxSliceNames.CHORES,
	initialState: INITIAL_STATE,
	reducers: {
		deleteChore: deleteByChoreID,
	},
	extraReducers: (builder) => {
		builder.addMatcher(choresAPI.endpoints.createChore.matchFulfilled, updateByChoresAPIResponse);
		builder.addMatcher(choresAPI.endpoints.getChore.matchFulfilled, updateByChoresAPIResponse);
		builder.addMatcher(choresAPI.endpoints.updateChore.matchFulfilled, updateByChoresAPIResponse);
		builder.addMatcher(choresAPI.endpoints.getAllChoresByHideout.matchFulfilled, loadAllHideoutChoresAPIResponse);
	},
});

export default choresSlice.reducer;
