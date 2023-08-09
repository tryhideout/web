import APICore from 'services/api/utils/core';

const url = 'sessions';

const sessionsAPI = new APICore({
	get: true,
	post: true,
	put: true,
	remove: true,
	url: url,
});

export default sessionsAPI;
