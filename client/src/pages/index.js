export { default as LandingPage } from 'pages/LandingPage';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
