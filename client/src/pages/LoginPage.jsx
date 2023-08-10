import React from 'react';
import { Input } from '@chakra-ui/react';
import { Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';
import logo from '../assets/images/logo.svg';
import { Button } from '@chakra-ui/react';

function LoginPage() {
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
				<Box>
					<Input placeholder='Email address' mb='1rem' />
					<Input type='password' placeholder='Password' mb='1rem' />
				</Box>
				<Button
					minWidth='55%'
					bgGradient='linear(to-u, #F8A11E, #F8861E)'
					_hover={{ bgGradient: 'linear(to-b, #F8861E, #F8A11E)' }}
					color='white'
					my='1rem'
				>
					Log In
				</Button>
				<Divider my='1rem' maxWidth='55%' />
				<Text>
					Don't have an account?{' '}
					<Link href='#' color='#4299E1' fontWeight='bold'>
						Sign up here
					</Link>
				</Text>
			</Center>
		</Center>
	);
}

export default LoginPage;

// <Box maxHeight='fit-content' maxWidth='fit-content'>
// 	<LoginHeader />
// 	<LoginContent />
// 	<LoginFooter />
// </Box>
