import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';

import { sessionsAPI } from 'services/api';
import { refreshSession } from 'redux/actions/authActions';
import { useQuery } from 'services/hooks';

const Gateway = (props) => {
	const { children, auth, refreshSession } = props;
	const redirectURL = useQuery('redirect') || '/app/dashboard';
	const [checkCompleted, setCheckCompleted] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			const response = await sessionsAPI.get();
			if (response.success) await refreshSession();
			setCheckCompleted(true);
		};

		setTimeout(async () => {
			await getSession();
		}, 750);
	}, [refreshSession]);

	const getRenderContent = () => {
		if (!checkCompleted && auth.isLoggedIn === false) {
			return (
				<Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center' backgroundColor='navy.600'>
					<Spinner size='xl' thickness='4px' color='orange.300' />
				</Box>
			);
		} else if (auth.isLoggedIn === false && checkCompleted) {
			return children;
		}
	};

	return auth.isLoggedIn ? <Navigate to={redirectURL} /> : getRenderContent();
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { refreshSession })(Gateway);
