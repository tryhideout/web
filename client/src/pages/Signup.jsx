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
				<Box textAlign='center'>
					<Heading size='2xl' flex='0.15'>
						Get started with{' '}
						<Text display='inline-block' bgGradient='linear(to-r, #F8A11E, #F8861E)' bgClip='text'>
							Hideout
						</Text>
					</Heading>
				</Box>

				<Box flex='0.15' textAlign='center' maxW='80%' paddingY='0.5rem' fontFamily='Hubot' fontSize='md'>
					Welcome to Hideout! To sign up, enter your details below or sign up by choosing a social provider.
				</Box>
				<Box>
					<Box display='flex' mt='1rem'>
						<Input placeholder='First name' mr='0.5rem'></Input>
						<Input placeholder='Last name' ml='0.5rem'></Input>
					</Box>
					<Input placeholder='Email address' mt='1rem'></Input>
					<Box display='flex' mt='1rem'>
						<Input placeholder='Password' mr='0.5rem'></Input>
						<Input placeholder='Confirm Password' ml='0.5rem'></Input>
					</Box>
				<Divider mt='1.25rem' mb='0.5rem' w='100%' borderWidth='1px' borderStyle='solid' borderRadius='5'></Divider>
					<Button mt='1rem' width='100%'>Sign Up</Button>
				</Box>
				
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
