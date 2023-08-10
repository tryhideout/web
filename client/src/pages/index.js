export { default as LandingPage } from 'pages/LandingPage';
export { default as LoginPage } from 'pages/LoginPage';
export { default as SignupPage } from 'pages/SignupPage';
export { default as DashboardPage } from 'pages/DashboardPage';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
