import { useLocation } from 'react-router-dom';

const useCurrentTab = () => {
	const pathnameArray = useLocation().pathname.split('/');
	const currentTab =
		pathnameArray[pathnameArray.length - 1].charAt(0).toUpperCase() + pathnameArray[pathnameArray.length - 1].slice(1);
	return currentTab;
};

export default useCurrentTab;
