export { default as LandingHeader } from 'components/LandingHeader';
export { default as LandingContent } from 'components/LandingContent';
export { default as Gateway } from 'components/Gateway';
export { default as Protected } from 'components/Protected';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
