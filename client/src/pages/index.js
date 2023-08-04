export { default as LandingPage } from 'pages/LandingPage';
export { default as LoginPage } from 'pages/LoginPage';
export { default as Dashboard } from 'pages/Dashboard';
// add for signup page as well

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
