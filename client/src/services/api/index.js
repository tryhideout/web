export { default as usersAPI } from 'services/api/routers/users';
export { default as sessionsAPI } from 'services/api/routers/sessions';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
