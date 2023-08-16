import { LOAD_HIDEOUT_DATA } from 'redux/actions/types';
import { hideoutAPI } from 'services/api';
import { showToast, HTTPError } from 'services/helpers';

export const loadHideoutData = (hideoutID) => async (dispatch) => {
	try {
		const response = await hideoutAPI.get(hideoutID);
		dispatch({ type: LOAD_HIDEOUT_DATA, ...response });
		if (!response.success) throw new HTTPError(response);
	} catch (error) {
		showToast.error('Unable to load hideout data', 'Something went wrong while loading hideout data.');
	}
};
