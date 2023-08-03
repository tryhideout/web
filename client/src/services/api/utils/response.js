export const handleResponse = (response) => {
	const successResponse = {
		success: response.status < 300,
		payload: response.data,
		code: response.status,
	};
	return successResponse;
};

export const handleError = ({ response }) => {
	const errorResponse = {
		success: response?.data ? response?.data.success : false,
		payload: response?.data,
		code: response?.status,
	};
	return errorResponse;
};
