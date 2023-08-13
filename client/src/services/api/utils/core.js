import axios from 'axios';
import { handleResponse, handleError } from 'services/api/utils/response';

const BASE_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:4000/api';
axios.defaults.withCredentials = true;

class APICore {
	constructor(options) {
		if (options.get) {
			this.get = async (id = '', headers = {}, params = {}) => {
				try {
					const suffix = id === '' ? '' : `/${id}`;
					const response = await axios.get(`${BASE_URL}/${options.url + suffix}`, {
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
			this.post = async (body = {}, headers = {}) => {
				try {
					const response = await axios.post(`${BASE_URL}/${options.url}`, body, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}

		if (options.put) {
			this.put = async (id = '', body = {}, headers = {}) => {
				try {
					const suffix = id === '' ? '' : `/${id}`;
					const response = await axios.put(`${BASE_URL}/${options.url + suffix}`, body, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}

		if (options.patch) {
			this.patch = async (id = '', body = {}, headers = {}) => {
				try {
					const suffix = id === '' ? '' : `/${id}`;
					const response = await axios.patch(`${BASE_URL}/${options.url + suffix}`, body, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}

		if (options.remove) {
			this.remove = async (id = '', headers = {}) => {
				try {
					const suffix = id === '' ? '' : `/${id}`;
					const response = await axios.delete(`${BASE_URL}/${options.url + suffix}`, { headers });
					return handleResponse(response);
				} catch (error) {
					return handleError(error);
				}
			};
		}
	}
}

export default APICore;
