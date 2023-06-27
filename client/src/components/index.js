export { default as LandingHeader } from 'components/LandingHeader';
export { default as LandingContent } from 'components/LandingContent';
export { default as LoginHeader } from 'components/LoginHeader';
export { default as LoginContent } from 'components/LoginContent';
export { default as LoginFooter } from 'components/LoginFooter';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
