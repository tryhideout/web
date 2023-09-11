import { LOAD_HIDEOUT_DATA, CREATE_HIDEOUT } from 'redux/actions/types';
import { usersAPI, hideoutAPI } from 'services/api';
import { showToast, HTTPError } from 'services/helpers';

export const loadHideoutData = (hideoutID) => async (dispatch) => {
	try {
		const response = await hideoutAPI.get(hideoutID);
		if (!response.success) throw new HTTPError(response);
		dispatch({ type: LOAD_HIDEOUT_DATA, ...response });
	} catch (error) {
		console.log(error);
		showToast.error('Unable to load hideout data', 'Something went wrong while loading hideout data.');
	}
};

export const createHideout = (hideoutName, ownerID) => async (dispatch) => {
	try {
		const response = hideoutAPI.post({ name: hideoutName, owner_id: ownerID });
		if (!response.success) throw new HTTPError(response);
		showToast.success('Hideout created!', `${hideoutName} has been created and is ready for use!`);
		dispatch({ type: CREATE_HIDEOUT, ...response });
	} catch (error) {
		showToast.error('Unable to load hideout data', 'Something went wrong while loading hideout data.');
	}
};

// TODO: Refresh session when leaving Hideout
