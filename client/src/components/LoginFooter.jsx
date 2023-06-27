import React from 'react';
import { Center, Link, Text } from '@chakra-ui/react';

function LoginFooter() {
	return (
		<Center>
			<Text>
				Don't have an account?{' '}
				<Link href='#' color='#4299E1'>
					Sign up here
				</Link>
			</Text>
		</Center>
	);
}

export default LoginFooter;
