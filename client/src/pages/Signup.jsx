import React from 'react';
import { Input } from '@chakra-ui/react';
import { Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';
import logo from '../assets/images/logo.svg';
import { Button } from '@chakra-ui/react';

function Signup() {
	return (
		<Center>
			<Center flexDirection='column' height='100vh' padding='1rem'>
				<Box flex='0.2'>
					<Image src={logo} alt='Logo' />
				</Box>
				<Box>
					<Heading size='2xl' flex='0.15'>
						Get started with{' '}
						<Text display='inline-block' bgGradient='linear(to-r, #F8A11E, #F8861E)' bgClip='text'>
							Hideout
						</Text>
					</Heading>
				</Box>

				<Box flex='0.15' textAlign='center' maxW='68%' paddingY='0.5rem' fontFamily='Hubot' fontSize='md'>
					Welcome to Hideout! To sign up, enter your details below or sign up by choosing a social provider.
				</Box>
				<Box flex='0.15'>
					<Box display='flex' mt='1rem'>
						<Input placeholder='First name' mr='0.5rem'></Input>
						<Input placeholder='Last name' ml='0.5rem'></Input>
					</Box>
					<Input placeholder='Email address' mt='1rem'></Input>
					<Box display='flex' my='1rem'>
						<Input placeholder='Password' mr='0.5rem'></Input>
						<Input placeholder='Confirm Password' ml='0.5rem'></Input>
					</Box>
					<Button width='100%'>Sign Up</Button>
				</Box>
				<Divider></Divider>
				<Text>
					Already have an account?{' '}
					<Link href='#' color='#4299E1'>
						Log in here
					</Link>
				</Text>
			</Center>
		</Center>
	);
}

export default Signup;
