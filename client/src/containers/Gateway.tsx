import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Spinner from '@/components/Spinner';
import { useQuery } from '@/utils/hooks';
import { RootState } from '@/utils/types';
import { useRefreshSessionQuery } from '@/redux/api/sessions';
import { refreshSession, verifySession } from '@/redux/slices/session';

const Gateway = ({ children }: { children: ReactElement }) => {
	const { data, isLoading, isSuccess, isError } = useRefreshSessionQuery();

	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.session.isLoggedIn);
	const redirectURL = useQuery('redirect') || '/app/expenses';

	useEffect(() => {
		setTimeout(() => {
			if (!isLoading && isSuccess) {
				dispatch(refreshSession(data));
			} else if (!isLoading && isError) {
				dispatch(verifySession({ isLoggedIn: false }));
			}
		}, 1700);
	}, [dispatch, data, isLoading, isSuccess, isError]);

	const getRenderContent = () => {
		if (isLoggedIn === null) {
			return (
				<Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
					<Spinner size={100} />
				</Box>
			);
		} else {
			return children;
		}
	};

	return isLoggedIn ? <Navigate to={redirectURL} /> : getRenderContent();
};

export default Gateway;
