export { default as LandingHeader } from 'components/LandingHeader';
export { default as LandingContent } from 'components/LandingContent';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
