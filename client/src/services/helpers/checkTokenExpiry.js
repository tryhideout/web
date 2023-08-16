import jwt_decode from 'jwt-decode';

const checkTokenExpiry = (token) => {
	const { exp } = jwt_decode(token);
	const expiryTime = exp * 1000;
	const utcTimestamp = new Date().getTime();
	if (utcTimestamp > expiryTime) return false;
	return true;
};

export default checkTokenExpiry;
