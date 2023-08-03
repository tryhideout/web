import APICore from 'services/api/utils/core';

const url = 'users';

const userAPI = new APICore({
	get: true,
	post: true,
	put: true,
	remove: true,
	url: url,
});

export default userAPI;
