import React from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = (name: string) => {
	const { search } = useLocation();
	const query = React.useMemo(() => new URLSearchParams(search), [search]);
	return query.get(name);
};

export default useQuery;
