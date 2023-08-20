import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, Button, Input, Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';

import { signUpWithCredentials } from 'redux/actions/authActions';
import { showToast } from 'services/helpers';
import logo from 'assets/images/logo.svg';

const SignupPage = (props) => {
	const { signUpWithCredentials } = props;
	const [inputState, setInputState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

		const tests = {
			email: emailRegex.test(inputState.email),
			password: passwordRegex.test(inputState.password),
			passwordsMatch: inputState.password === inputState.confirmPassword,
		};

		if (tests.email && tests.password && tests.passwordsMatch) {
			await signUpWithCredentials(inputState.email, inputState.password, inputState.firstName, inputState.lastName);
		} else {
			if (!tests.email) showToast.warning('Improper email format.', 'Emails must be in the abc@abc.com format.');
			if (!tests.password)
				showToast.warning('Insecure password.', 'Use at least 8 letters, 1 number, 1 uppercase and 1 lowercase letter.');
			if (!tests.passwordsMatch)
				showToast.warning('Passwords do not match.', 'Ensure that the password and confirm password fields match.');
		}
	};

	return (
		<Center>
			<Center flexDirection='column' height='100vh' padding='1rem'>
				<Box>
					<Image src={logo} alt='Logo' />
				</Box>
				<Box textAlign='center' mt='38px'>
					<Heading size='2xl' flex='0.15'>
						Get started with{' '}
						<Text display='inline-block' bgGradient='var(--chakra-colors-gradient)' bgClip='text'>
							Hideout
						</Text>
					</Heading>
				</Box>

				<Box flex='0.15' textAlign='center' maxW='80%' paddingY='0.5rem' fontFamily='Hubot' fontSize='20px' width='630px'>
					Welcome to Hideout! To sign up, enter your details below or sign up by choosing a social provider.
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
					<Divider mt='29px' w='90%' borderWidth='1.5px' borderStyle='solid' borderRadius='5' />
				</Box>

				<Text fontFamily='Hubot' mt='17px' fontSize='18px'>
					Already have an account?{' '}
					<Link href='/auth/login' color='blue.400' fontWeight='bold'>
						Log in here
					</Link>
				</Text>
			</Center>
		</Center>
	);
};

export default connect(null, { signUpWithCredentials })(SignupPage);
