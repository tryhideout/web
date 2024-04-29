import { Box, Link, Text, Center, Heading, Image } from '@chakra-ui/react';

import { SignupForm } from '@/containers';
import logo from '@/assets/images/logo.svg';

const SignupPage = () => {
	return (
		<Center>
			<Center flexDirection='column' height='100vh' padding='1rem'>
				<Box>
					<Image src={logo} alt='Logo' />
				</Box>
				<Box textAlign='center' mt='30px'>
					<Heading size='2xl' flex='0.15'>
						Welcome to{' '}
						<Text size='2xl' display='inline-block' bgGradient='linear(to-r, #F8A11E, #F8861E)' bgClip='text'>
							Hideout
						</Text>
					</Heading>
				</Box>
				<Box flex='0.15' textAlign='center' maxW='80%' mt='18px' fontFamily='Hubot' fontSize='20px' width='630px'>
					Hey there! To sign up for Hideout, enter your details below or click on one of our social providers.
				</Box>
				<SignupForm />
				<Text fontFamily='Hubot' mt='20px' fontSize='16px'>
					Already have an account?{' '}
					<Link href='/auth/login' color='blue.400' fontWeight='bold'>
						Log in here
					</Link>
				</Text>
			</Center>
		</Center>
	);
};

export default SignupPage;
