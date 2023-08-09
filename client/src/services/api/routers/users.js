import APICore from 'services/api/utils/core';

const url = 'users';

const usersAPI = new APICore({
	get: true,
	post: true,
	put: true,
	remove: true,
	url: url,
});

export default usersAPI;
