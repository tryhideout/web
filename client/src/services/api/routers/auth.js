import APICore from 'services/api/utils/core';

const url = 'sessions';

const authAPI = new APICore({
	get: false,
	post: true,
	put: true,
	remove: true,
	url: url,
});

export default authAPI;
