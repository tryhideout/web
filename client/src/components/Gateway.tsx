import { ReactElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';
import { useQuery } from 'utils/hooks';

const Gateway = ({ children }: { children: ReactElement }) => {
	const redirectURL = useQuery('redirect') || '/app/expenses';
	const [checkCompleted, setCheckCompleted] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			setCheckCompleted(true);
		};

		setTimeout(async () => {
			await getSession();
		}, 750);
	}, []);

	const getRenderContent = () => {
		return children;
		// if (!checkCompleted && user.isLoggedIn === false) {
		// 	return (
		// 		<Box
		// 			width='100vw'
		// 			height='100vh'
		// 			display='flex'
		// 			alignItems='center'
		// 			justifyContent='center'
		// 			backgroundColor='navy.600'
		// 		>
		// 			<Spinner size='xl' thickness='4px' color='orange.300' />
		// 		</Box>
		// 	);
		// } else if (user.isLoggedIn === false && checkCompleted) {
		// return children;
		// }
	};

	return false ? <Navigate to={redirectURL} /> : getRenderContent();
};

export default Gateway;
