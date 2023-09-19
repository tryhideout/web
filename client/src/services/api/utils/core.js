import axios from 'axios';
import { refreshSession } from 'redux/actions/authActions';
import { checkTokenExpiry } from 'services/helpers';
import { handleResponse, handleError } from 'services/api/utils/response';
import store from 'index';

const BASE_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:4000/api';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
	const url = config.url;
	if (!url.includes('/auth/session')) {
		const currentState = store.getState();
		const isLoggedIn = currentState.user.isLoggedIn;
		if (isLoggedIn) {
			const accessToken = currentState.user.accessToken;
			const tokenExpiry = checkTokenExpiry(accessToken);
			if (!tokenExpiry) await refreshSession();
			config.headers = { Authorization: `Bearer ${store.getState().user.accessToken}` };
		}
	}
	return config;
});

class APICore {
	constructor(options) {
		if (options.get) {
			this.get = async (suffix = '', headers = {}, params = {}) => {
				try {
					const urlSuffix = suffix === '' ? '' : `/${suffix}`;
					const response = await axios.get(`${BASE_URL}/${options.url + urlSuffix}`, {
						params,
						headers,
					});
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}

		if (options.post) {
			this.post = async (body = {}, headers = {}, suffix = '') => {
				const urlSuffix = suffix === '' ? '' : `/${suffix}`;
				try {
					const response = await axios.post(`${BASE_URL}/${options.url + urlSuffix}`, body, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}

		if (options.put) {
			this.put = async (body = {}, headers = {}, suffix = '') => {
				try {
					const urlSuffix = suffix === '' ? '' : `/${suffix}`;
					const response = await axios.put(`${BASE_URL}/${options.url + urlSuffix}`, body, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}

		if (options.patch) {
			this.patch = async (body = {}, headers = {}, suffix = '') => {
				try {
					const urlSuffix = suffix === '' ? '' : `/${suffix}`;
					const response = await axios.patch(`${BASE_URL}/${options.url + urlSuffix}`, body, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}

		if (options.remove) {
			this.remove = async (suffix = '', headers = {}) => {
				try {
					const urlSuffix = suffix === '' ? '' : `/${suffix}`;
					const response = await axios.delete(`${BASE_URL}/${options.url + urlSuffix}`, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}
	}
}

export default APICore;
