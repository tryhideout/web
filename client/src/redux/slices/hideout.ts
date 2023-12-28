import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxSliceNames } from 'utils/constants';
import type { HideoutsAPIResponse, Hideout, RootState, User, UsersAPIResponse } from 'utils/types';

const INITIAL_STATE: Hideout = {
	id: null,
	name: null,
	ownerID: null,
	joinCode: null,
	users: [],
};

const adaptUsersAPIResponseToEntity = (users: UsersAPIResponse[]): User[] =>
	users.map((user) => ({
		id: user.id,
		email: user.email,
		firstName: user.first_name,
		lastName: user.last_name,
		hideoutID: user.hideout_id,
		color: user.color,
	}));

const hideoutSlice = createSlice({
	name: ReduxSliceNames.HIDEOUT,
	initialState: INITIAL_STATE,
	reducers: {
		getHideout(state: Hideout, action: PayloadAction<HideoutsAPIResponse>): Hideout {
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				ownerID: action.payload.owner_id,
				joinCode: action.payload.join_code,
				users: adaptUsersAPIResponseToEntity(action.payload.users),
			};
		},
	},
});

export const { getHideout } = hideoutSlice.actions;

export const selectHideout = (state: RootState) => state.hideout;

export default hideoutSlice.reducer;
