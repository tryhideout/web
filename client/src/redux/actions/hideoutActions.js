import { LOAD_HIDEOUT_DATA, CREATE_HIDEOUT, JOIN_HIDEOUT } from 'redux/actions/types';
import { hideoutAPI } from 'services/api';
import { showToast, HTTPError } from 'services/helpers';

export const loadHideoutData = (hideoutID) => async (dispatch) => {
	try {
		const response = await hideoutAPI.get(hideoutID.toString());
		if (!response.success) throw new HTTPError(response);
		dispatch({ type: LOAD_HIDEOUT_DATA, ...response });
	} catch (error) {
		showToast.error('Unable to load hideout data', 'Something went wrong while loading hideout data.');
	}
};

export const createHideout = (hideoutName) => async (dispatch) => {
	try {
		const response = await hideoutAPI.post({ name: hideoutName });
		if (!response.success) throw new HTTPError(response);
		showToast.success('Hideout created!', `${hideoutName} has been created and is ready for use!`);
		dispatch({ type: CREATE_HIDEOUT, ...response });
	} catch (error) {
		showToast.error('Unable to load hideout data', 'Something went wrong while loading hideout data.');
	}
};

export const joinHideout = (joinCode) => async (dispatch) => {
	try {
		const response = await hideoutAPI.post({ join_code: joinCode }, {}, 'users');
		if (!response.success) throw new HTTPError(response);
		showToast.success('Joined Hideout!', `You have joined ${response.payload.name} as a new member!`);
		dispatch({ type: JOIN_HIDEOUT, ...response });
	} catch (error) {
		if (error.statusCode === 400) showToast.error('Hideout Full!', `This hideout is already full. Why not create one instead?`);
		else showToast.error('Invalid Join Code!', `The join code you provided is invalid. Please try another.`);
	}
};

// TODO: Refresh session when leaving Hideout
