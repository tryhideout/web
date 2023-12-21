import { JOIN_HIDEOUT, LOAD_HIDEOUT_DATA } from 'redux/actions/types';
import { ReducerInput } from 'utils/types';

interface HideoutState {
	name: string | null;
	ownerID: string | null;
	joinCode: string | null;
}

const INITIAL_STATE: HideoutState = {
	name: null,
	ownerID: null,
	joinCode: null,
};

const hideoutReducer = (state: HideoutState = INITIAL_STATE, { type, payload, success }: ReducerInput): HideoutState => {
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
