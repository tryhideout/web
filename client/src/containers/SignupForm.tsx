import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { IoLogoFacebook, IoLogoGithub, IoLogoGoogle } from 'react-icons/io5';

import { useCreateSessionMutation } from 'redux/api/sessions';
import { useCreateUserMutation } from 'redux/api/users';
import { AuthProviderIDs, CLIENT_ROUTES } from 'utils/constants';
import { catchify } from 'utils/exceptions';
import { adaptSignupForm, adaptSocialAuth } from 'utils/helpers/forms';
import { FirebaseProviderID } from 'utils/types';

const initialFormState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};

const SignupForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formState, setFormState] = useState(initialFormState);
	const [triggerCreateUser, userResult] = useCreateUserMutation();
	const [triggerCreateSession, sessionResult] = useCreateSessionMutation();
	const navigate = useNavigate();

	const handleStandardAuth = async () => {
		const requestBody = adaptSignupForm(formState);
		await triggerCreateUser(requestBody).unwrap();

		const sessionRequestBody = { email: requestBody.email, password: requestBody.password };
		await triggerCreateSession(sessionRequestBody);
	};

	const handleSocialAuth = async (providerID: FirebaseProviderID) => {
		const { isNewUser, requestBody } = await adaptSocialAuth(providerID);
		if (isNewUser) await triggerCreateUser(requestBody).unwrap();

		const sessionRequestBody = { email: requestBody.email, social_token: requestBody.social_token };
		await triggerCreateSession(sessionRequestBody);
		await navigate(CLIENT_ROUTES.EXPENSES);
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<form>
				<FormControl isInvalid={true}>
					<Box display='flex' mt='20px' alignItems='center' gap='15px'>
						<Input
							placeholder='First name'
							value={formState.firstName}
							onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
							isRequired
						/>
						<Input
							placeholder='Last name'
							value={formState.lastName}
							onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
							isRequired
						/>
					</Box>
					<Input
						placeholder='Email address'
						mt='1rem'
						type='email'
						value={formState.email}
						onChange={(e) => setFormState({ ...formState, email: e.target.value })}
						isRequired
					/>
					<Box display='flex' mt='17px' alignItems='center' gap='15px'>
						<InputGroup>
							<Input
								placeholder='Password'
								type={showPassword ? 'text' : 'password'}
								onChange={(e) => setFormState({ ...formState, password: e.target.value })}
								isRequired
							/>
							<InputRightElement width='4.5rem' mr='6px'>
								<Button variant='black' h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
					</Box>
					<Button
						isLoading={userResult.isLoading || sessionResult.isLoading}
						isDisabled={userResult.isLoading || sessionResult.isLoading}
						mt='24px'
						width='100%'
						type='button'
						onClick={() => catchify(handleStandardAuth)}
					>
						Sign Up
					</Button>
				</FormControl>
			</form>
			<Divider mt='24px' w='90%' borderWidth='1.5px' borderStyle='solid' borderRadius='5' />
			<Box display='flex' gap='22px' mt='20px'>
				<Button
					size='plg'
					background='red.500'
					leftIcon={<IoLogoGoogle color='white' />}
					onClick={() => handleSocialAuth(AuthProviderIDs.GOOGLE)}
				>
					Google
				</Button>
				<Button
					size='plg'
					background='blue.500'
					leftIcon={<IoLogoFacebook color='white' />}
					onClick={() => handleSocialAuth(AuthProviderIDs.FACEBOOK)}
				>
					Facebook
				</Button>
				<Button
					size='plg'
					background='black'
					leftIcon={<IoLogoGithub />}
					onClick={() => handleSocialAuth(AuthProviderIDs.GITHUB)}
				>
					Github
				</Button>
			</Box>
		</Box>
	);
};

export default SignupForm;
