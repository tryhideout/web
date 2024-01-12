import React, { useState } from 'react';
import { FormControl, Button, Input, Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';
import { IoLogoGoogle, IoLogoFacebook, IoLogoGithub } from 'react-icons/io5';

import toast from 'utils/helpers/toast';
import logo from 'assets/images/logo.svg';

const SignupPage = () => {
	const [inputState, setInputState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

		const tests = {
			email: emailRegex.test(inputState.email),
			password: passwordRegex.test(inputState.password),
			passwordsMatch: inputState.password === inputState.confirmPassword,
		};

		if (tests.email && tests.password && tests.passwordsMatch) {
			// await signUpWithCredentials(inputState.email, inputState.password, inputState.firstName, inputState.lastName);
		} else {
			if (!tests.email) toast.warning('Improper email format.', 'Emails must be in the abc@abc.com format.');
			if (!tests.password)
				toast.warning('Insecure password.', 'Use at least 8 letters, 1 number, 1 uppercase and 1 lowercase letter.');
			if (!tests.passwordsMatch)
				toast.warning('Passwords do not match.', 'Ensure that the password and confirm password fields match.');
		}
	};

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
				<Box display='flex' flexDirection='column' alignItems='center'>
					<form onSubmit={handleSubmit}>
						<FormControl isInvalid={true}>
							<Box display='flex' mt='20px' alignItems='center' gap='15px'>
								<Input
									placeholder='First name'
									value={inputState.firstName}
									onChange={(e) => setInputState({ ...inputState, firstName: e.target.value })}
									isRequired
								/>
								<Input
									placeholder='Last name'
									value={inputState.lastName}
									onChange={(e) => setInputState({ ...inputState, lastName: e.target.value })}
									isRequired
								/>
							</Box>
							<Input
								placeholder='Email address'
								mt='1rem'
								type='email'
								value={inputState.email}
								onChange={(e) => setInputState({ ...inputState, email: e.target.value })}
								isRequired
							/>
							<Box display='flex' mt='17px' alignItems='center' gap='15px'>
								<Input
									placeholder='Password'
									type='password'
									value={inputState.password}
									onChange={(e) => setInputState({ ...inputState, password: e.target.value })}
									isRequired
								/>
								<Input
									placeholder='Confirm Password'
									type='password'
									value={inputState.confirmPassword}
									onChange={(e) => setInputState({ ...inputState, confirmPassword: e.target.value })}
									isRequired
								/>
							</Box>
							<Button mt='24px' width='100%' type='submit'>
								Sign Up
							</Button>
						</FormControl>
					</form>
					<Divider mt='24px' w='90%' borderWidth='1.5px' borderStyle='solid' borderRadius='5' />
				</Box>
				<Box display='flex' gap='22px' mt='20px'>
					<Button size='plg' background='red.500' leftIcon={<IoLogoGoogle color='white' />}>
						Google
					</Button>
					<Button size='plg' background='blue.500' leftIcon={<IoLogoFacebook color='white' />}>
						Facebook
					</Button>
					<Button size='plg' background='black' leftIcon={<IoLogoGithub />}>
						Github
					</Button>
				</Box>
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
