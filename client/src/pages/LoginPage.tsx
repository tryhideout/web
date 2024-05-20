import { Box, Link, Text, Center, Heading, Image } from '@chakra-ui/react';

import { LoginForm } from '@/containers';
import logo from '@/assets/images/logo.svg';

const LoginPage = () => {
	return (
		<Center>
			<Center flexDirection='column' height='100vh' width='fit-content'>
				<Image src={logo} alt='Logo' />
				<Heading size='2xl' mt='36px'>
					Log in to{' '}
					<Text size='2xl' display='inline-block' bgGradient='linear(to-r, #F8A11E, #F8861E)' bgClip='text'>
						Hideout
					</Text>
				</Heading>
				<Box maxW='578px' textAlign='center' fontFamily='Hubot' fontSize='20px' mt='17px'>
					Enter your details below to log back in. If you forgot your password, just click the link at the bottom of the
					page.
				</Box>
				<LoginForm />
				<Text mt='20px' fontSize='18px'>
					Don't have an account?{' '}
					<Link href='/auth/signup' color='#4299E1' fontWeight='bold'>
						Sign up here
					</Link>
					.
				</Text>
			</Center>
		</Center>
	);
};

export default LoginPage;
