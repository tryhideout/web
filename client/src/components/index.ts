export { default as LandingHeader } from 'components/LandingHeader';
export { default as LandingContent } from 'components/LandingContent';
export { default as Gateway } from 'components/Gateway';
export { default as Protected } from 'components/Protected';
export { default as SideBar } from 'components/SideBar';
export { default as SideBarTile } from 'components/SideBarTile';
export { default as TopBar } from 'components/TopBar';

const defaultImportError = () => {
	console.error('API imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
