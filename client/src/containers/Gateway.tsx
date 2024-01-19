import { ReactElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Spinner } from '@chakra-ui/react';

import { useQuery } from 'utils/hooks';
import { RootState, SessionsAPIResponse } from 'utils/types';
import { useRefreshSessionQuery } from 'redux/api/sessions';
import { refreshSession, verifySession } from 'redux/slices/session';

const Gateway = ({ children }: { children: ReactElement }) => {
	const { data, isLoading, isSuccess, isError } = useRefreshSessionQuery();

	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.session.isLoggedIn);
	const redirectURL = useQuery('redirect') || '/app/expenses';

	useEffect(() => {
		if (!isLoading && isSuccess) {
			dispatch(refreshSession(data));
		} else if (!isLoading && isError) {
			dispatch(verifySession({ isLoggedIn: false }));
		}
	}, [dispatch, data, isLoading, isSuccess, isError]);

	const getRenderContent = () => {
		if (isLoggedIn === null) {
			return (
				<Box
					width='100vw'
					height='100vh'
					display='flex'
					alignItems='center'
					justifyContent='center'
					backgroundColor='navy.600'
				>
					<Spinner size='xl' thickness='4px' color='orange.300' />
				</Box>
			);
		} else {
			return children;
		}
	};

	return isLoggedIn ? <Navigate to={redirectURL} /> : getRenderContent();
};

export default Gateway;
