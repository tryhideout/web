import { JOIN_HIDEOUT, LOAD_HIDEOUT_DATA } from 'redux/actions/types';

const INITIAL_STATE = {
	name: null,
	ownerID: null,
	joinCode: null,
};

const hideoutReducer = (state = INITIAL_STATE, { type, payload, success }) => {
	if (!success) return state;
	switch (type) {
		case LOAD_HIDEOUT_DATA:
			return {
				...state,
				name: payload.name,
				ownerID: payload.owner_id,
				joinCode: payload.join_code,
			};
		case JOIN_HIDEOUT:
			return {
				...state,
				name: payload.name,
				ownerID: payload.owner_id,
				joinCode: payload.join_code,
			};
		default:
			return state;
	}
};

export default hideoutReducer;
