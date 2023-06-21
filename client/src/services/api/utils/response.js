export const handleResponse = (response) => {
    const successResponse = {
        success: response.data.success,
        payload: response.data.payload,
        code: response.status,
    };
    return successResponse;
};

export const handleError = ({ response }) => {
    const errorResponse = {
        success: response.data ? response.data.success : false,
        payload: response.data ? response.data.payload : null,
        code: response.status,
    };
    return errorResponse;
};
