import APICore from 'services/api/utils/core';

const url = 'hideouts';

const hideoutAPI = new APICore({
	get: false,
	post: true,
	put: true,
	remove: true,
	url: url,
});

export default hideoutAPI;