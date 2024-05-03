import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useQuery } from '@/utils/hooks';
import { RootState } from '@/utils/types';
import { useRefreshSessionQuery } from '@/redux/api/sessions';
import { refreshSession, verifySession } from '@/redux/slices/session';
import { useGetUserQuery } from '@/redux/api/users';
import { Spinner } from '@/components';
import { ClientRoutes } from '@/utils/constants';

const Gateway = ({ children }: { children: ReactElement }) => {
	const { data, isLoading, isSuccess, isError } = useRefreshSessionQuery();

	const session = useSelector((state: RootState) => state.session);
	const currentUser = useSelector((state: RootState) => state.user);
	useGetUserQuery(session.userID!, { skip: !session.isLoggedIn || currentUser.id !== null });

	const dispatch = useDispatch();
	const redirectURL = useQuery('redirect') || ClientRoutes.EXPENSES;

	useEffect(() => {
		setTimeout(() => {
			if (!isLoading && isSuccess) {
				dispatch(refreshSession(data));
			} else if (!isLoading && isError) {
				dispatch(verifySession({ isLoggedIn: false }));
			}
		}, 1800);
	}, [dispatch, data, isLoading, isSuccess, isError]);

	const getRenderContent = () => {
		if (session.isLoggedIn === null || (session.isLoggedIn && currentUser.id === null)) {
			return (
				<Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
					<Spinner size={80} useLogo={true} />
				</Box>
			);
		} else {
			return children;
		}
	};

	return session.isLoggedIn && currentUser.id !== null ? <Navigate to={redirectURL} /> : getRenderContent();
};

export default Gateway;
