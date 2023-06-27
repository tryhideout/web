import React from 'react';
import { Box, Center, Heading, Image, Text } from '@chakra-ui/react';
import logo from '../assets/images/logo.svg';

function LoginHeader() {
	return (
		<Center>
			<Center flexDirection='column' height='100vh' width='fit-content'>
				<Box flex='0.2'>
					<Image src={logo} alt='Logo' />
				</Box>
				<Heading size='2xl' flex='0.15'>
					Log in to{' '}
					<Text display='inline-block' bgGradient='linear(to-r, #F8A11E, #F8861E)' bgClip='text'>
						Hideout
					</Text>
				</Heading>
				<Box maxWidth='55%' fontSize='1.2rem' textAlign='center' my='1rem'>
					Enter your details below to log back in. If you forgot your password, just click the link at the bottom of the page.
				</Box>
			</Center>
		</Center>
	);
}

export default LoginHeader;
