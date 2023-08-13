export { default as LandingHeader } from 'components/LandingHeader';
export { default as LandingContent } from 'components/LandingContent';
export { default as LoginHeader } from 'components/LoginHeader';
export { default as LoginContent } from 'components/LoginContent';
export { default as LoginFooter } from 'components/LoginFooter';
export { default as TopBar } from 'components/TopBar';
export { default as SideBar } from 'components/SideBar';
export { default as SideBarTile } from 'components/SideBarTile';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
