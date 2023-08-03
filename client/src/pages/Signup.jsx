import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, Button, Input, Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo.svg';
import userAPI from 'services/api/routers/user';
import { updateUser } from 'redux/slices/userSlice';

function Signup() {
	const [input, setInput] = useState({ first_name: null, last_name: null, email: null, password: null });
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		setShowError(false);
		if (input.password !== passwordConfirmation) {
			setErrorMessage('Passwords do not match. Ensure you are using the same passwords in both fields.');
			setShowError(true);
		} else if (input.password.length < 6) {
			setErrorMessage('The password is weak. Use a password with at least 6 characters.');
			setShowError(true);
		} else {
			let response = await userAPI.post({
				first_name: input.first_name,
				last_name: input.last_name,
				email: input.email,
				password: input.password,
			});

			if (response.payload === 'Resource Already Exists') {
				setErrorMessage('Email already exists. Please use a different email.');
				setShowError(true);
			} else {
				console.log(response);
				// successful signup
				dispatch(updateUser(response.payload));
				navigate(`/onboarding/login`);
			}
		}
	};

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
					<form onSubmit={handleSubmit}>
						<Box display='flex' mt='1rem'>
							<FormControl isInvalid={true}>
								<Input
									placeholder='First name'
									mr='0.5rem'
									value={input.first_name}
									onChange={(e) => setInput({ ...input, first_name: e.target.value })}
									isRequired
								/>
							</FormControl>
							<Input
								placeholder='Last name'
								ml='0.5rem'
								value={input.last_name}
								onChange={(e) => setInput({ ...input, last_name: e.target.value })}
								isRequired
							/>
						</Box>
						<Input
							placeholder='Email address'
							mt='1rem'
							type='email'
							value={input.email}
							onChange={(e) => setInput({ ...input, email: e.target.value })}
							isRequired
						/>
						<Box display='flex' mt='1rem'>
							<Input
								placeholder='Password'
								mr='0.5rem'
								type='password'
								value={input.password}
								onChange={(e) => setInput({ ...input, password: e.target.value })}
								isRequired
							/>
							<Input
								placeholder='Confirm Password'
								ml='0.5rem'
								type='password'
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								isRequired
							/>
						</Box>
						<Button mt='1rem' width='100%' type='submit'>
							Sign Up
						</Button>
						<Divider mt='1.25rem' mb='0.5rem' w='100%' borderWidth='1px' borderStyle='solid' borderRadius='5' />
						{showError && (
							<Box w='100%' mt='1rem' mb='0.5rem' bg='red.100' color='red.500' p='1rem' borderRadius='md' textAlign='center'>
								{errorMessage}
							</Box>
						)}
					</form>
				</Box>

				<Text fontFamily='Hubot'>
					Already have an account?{' '}
					<Link href='/auth/login' color='#4299E1' fontWeight='bold'>
						Log in here
					</Link>
				</Text>
			</Center>
		</Center>
	);
}

export default Signup;
