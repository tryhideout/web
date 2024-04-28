import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, FormControl, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { IoLogoFacebook, IoLogoGithub, IoLogoGoogle } from 'react-icons/io5';

import { useCreateSessionMutation } from '@/redux/api/sessions';
import { useCreateUserMutation } from '@/redux/api/users';
import { AuthProviderIDs, ClientRoutes } from '@/utils/constants';
import { catchify } from '@/utils/helpers/common';
import { FirebaseAuthFlow } from '@/utils/services';
import { generateEmptyStringObject } from '@/utils/helpers/common';
import { FirebaseProviderID, SignupFormState } from '@/utils/types';
import adapters from '@/utils/helpers/adapters';
import Toast from '@/utils/helpers/toast';

const initialFormState = generateEmptyStringObject(['email', 'password', 'firstName', 'lastName']) as SignupFormState;

const SignupForm = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const [showPassword, setShowPassword] = useState(false);
	const [providerLoading, setProviderLoading] = useState<null | string>(null);
	const [formState, setFormState] = useState(initialFormState);

	const [triggerCreateUser, createUserResult] = useCreateUserMutation();
	const [triggerCreateSession, createSessionResult] = useCreateSessionMutation();

	/**
	 * Handles email and password auth initiating create user and session API requests.
	 */
	const handleStandardAuth = async () => {
		const createUserRequestBody = adapters.standardAuthCreateUserRequest(formState);
		const createUserPromise = triggerCreateUser(createUserRequestBody).unwrap();
		Toast.showCreateUserPromiseToast(toast, createUserPromise, { social: false });

		const createSessionRequestBody = adapters.standardAuthCreateSessionRequest(formState);
		await triggerCreateSession(createSessionRequestBody);
		navigate(ClientRoutes.EXPENSES);
	};

	/**
	 * Handles social auth via the selected Firebase provider and initiates user & session API requests.
	 * Bypasses create user API request if user already has social auth account with selected email.
	 * @param {FirebaseProviderID} providerID - The Firebase provider selected for this social auth flow.
	 */
	const handleSocialAuth = async (providerID: FirebaseProviderID) => {
		const authFlow = new FirebaseAuthFlow(providerID);
		const { currentUser, additionalInfo, socialToken } = await authFlow.trigger();

		if (additionalInfo?.isNewUser) {
			const requestBody = adapters.socialAuthCreateUserRequest(currentUser, socialToken);
			const createUserPromise = triggerCreateUser(requestBody).unwrap();
			Toast.showCreateUserPromiseToast(toast, createUserPromise, { social: true });
		} else {
			Toast.showBypassSignupToast(toast);
		}

		const sessionRequestBody = adapters.socialAuthCreateSessionRequest(currentUser, socialToken);
		await triggerCreateSession(sessionRequestBody);
		navigate(ClientRoutes.EXPENSES);
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<form>
				<FormControl isInvalid={true}>
					<Box display='flex' mt='20px' alignItems='center' gap='15px'>
						<Input
							id='first_name'
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
						id='email'
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
								id='password'
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
						isLoading={createUserResult.isLoading || createSessionResult.isLoading}
						isDisabled={createUserResult.isLoading || createSessionResult.isLoading || providerLoading !== null}
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
					isDisabled={providerLoading !== null}
					isLoading={providerLoading === AuthProviderIDs.GOOGLE}
					onClick={() => {
						setProviderLoading(AuthProviderIDs.GOOGLE);
						catchify(handleSocialAuth, AuthProviderIDs.GOOGLE);
					}}
				>
					Google
				</Button>
				<Button
					size='plg'
					background='blue.500'
					isDisabled={providerLoading !== null || createUserResult.isLoading || createSessionResult.isLoading}
					isLoading={providerLoading === AuthProviderIDs.FACEBOOK}
					leftIcon={<IoLogoFacebook color='white' />}
					onClick={() => {
						setProviderLoading(AuthProviderIDs.FACEBOOK);
						catchify(handleSocialAuth, AuthProviderIDs.FACEBOOK);
					}}
				>
					Facebook
				</Button>
				<Button
					size='plg'
					background='black'
					leftIcon={<IoLogoGithub />}
					isDisabled={providerLoading !== null}
					isLoading={providerLoading === AuthProviderIDs.GITHUB}
					onClick={() => {
						setProviderLoading(AuthProviderIDs.GITHUB);
						catchify(handleSocialAuth, AuthProviderIDs.GITHUB);
					}}
				>
					Github
				</Button>
			</Box>
		</Box>
	);
};

export default SignupForm;
