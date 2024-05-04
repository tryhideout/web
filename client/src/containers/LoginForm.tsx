import { useState } from 'react';
import { Box, FormControl, Input, Button, Divider, useToast } from '@chakra-ui/react';
import { IoLogoGoogle, IoLogoFacebook, IoLogoGithub } from 'react-icons/io5';

import { catchify, generateEmptyStringObject } from '@/utils/helpers/common';
import { FirebaseProviderID, LoginFormState, RootState, SessionsAPIResponse } from '@/utils/types';
import { useCreateSessionMutation } from '@/redux/api/sessions';
import adapters from '@/utils/helpers/adapters';
import APIRequestHandler from '@/utils/helpers/requests';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	AuthProviderIDs,
	ClientRoutes,
	LoginStandardAuthCreateSessionToastMessages,
	StandaloneLoginNewFirebaseUserErrorToast,
} from '@/utils/constants';
import { createSession } from '@/redux/slices/session';
import { FirebaseAuthFlow } from '@/utils/services';

const initialFormState = generateEmptyStringObject(['email', 'password']) as LoginFormState;

const LoginForm = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestHandler = new APIRequestHandler(toast, dispatch);

	const [formState, setFormState] = useState(initialFormState);
	const [loadingProvider, setLoadingProvider] = useState<AuthProviderIDs | null>(null);
	const session = useSelector((state: RootState) => state.session);
	const [triggerCreateSession, createSessionResult] = useCreateSessionMutation();

	/**
	 * Handles email and password auth by initiating session API requests.
	 * Manually dispatches createSession action based on API response;
	 * @async
	 */
	const handleStandardAuth = async () => {
		const requestBody = adapters.standardAuthCreateSessionRequest(formState);
		const createSessionPromise = triggerCreateSession(requestBody).unwrap();

		const responsePayload = (await requestHandler.awaitAndToastRequest(
			createSessionPromise,
			LoginStandardAuthCreateSessionToastMessages,
		)) as SessionsAPIResponse;
		dispatch(createSession(responsePayload));

		await requestHandler.refreshUserAndSessionState(session, { skipSessionRefresh: true });
		navigate(ClientRoutes.EXPENSES);
	};

	/**
	 *
	 * Handles social auth via the selected Firebase provider and initiates session API requests.
	 * Deletes user and shows error toast, if the resulting Firebase user is new.
	 * @async
	 * @param {FirebaseProviderID} providerID - Firebase provider selected for this social auth flow.
	 */
	const handleSocialAuth = async (providerID: FirebaseProviderID) => {
		const authFlow = new FirebaseAuthFlow(providerID);
		const { currentUser, additionalInfo, socialToken } = await authFlow.trigger();

		if (additionalInfo?.isNewUser) {
			await authFlow.cancel();
			toast(StandaloneLoginNewFirebaseUserErrorToast);
			return;
		}

		const requestBody = adapters.socialAuthCreateSessionRequest(currentUser, socialToken);
		const createSessionPromise = triggerCreateSession(requestBody).unwrap();
		const responsePayload = (await requestHandler.awaitAndToastRequest(
			createSessionPromise,
			LoginStandardAuthCreateSessionToastMessages,
		)) as SessionsAPIResponse;
		dispatch(createSession(responsePayload));

		await requestHandler.refreshUserAndSessionState(session, { skipSessionRefresh: true });
		navigate(ClientRoutes.EXPENSES);
	};

	return (
		<Box maxW='547px' display='flex' flexDirection='column' alignItems='center' mt='25px'>
			<form>
				<FormControl isInvalid={true}>
					<Input
						value={formState.email}
						onChange={(e) => setFormState({ ...formState, email: e.target.value })}
						placeholder='Email address'
						mb='1rem'
						isRequired
					/>
					<Input
						value={formState.password}
						onChange={(e) => setFormState({ ...formState, password: e.target.value })}
						type='password'
						placeholder='Password'
						isRequired
					/>
					<Button
						width='100%'
						variant='gradient400'
						mt='25px'
						isLoading={createSessionResult.isLoading}
						isDisabled={createSessionResult.isLoading}
						type='submit'
						onClick={() => catchify(handleStandardAuth)}
					>
						Log In
					</Button>
				</FormControl>
			</form>
			<Divider mt='24px' w='92%' borderWidth='1.5px' borderStyle='solid' borderRadius='5' />
			<Box display='flex' gap='22px' mt='20px'>
				<Button
					size='plg'
					isLoading={createSessionResult.isLoading || loadingProvider === AuthProviderIDs.GOOGLE}
					isDisabled={createSessionResult.isLoading || loadingProvider !== null}
					background='red.500'
					leftIcon={<IoLogoGoogle color='white' />}
					onClick={() => {
						setLoadingProvider(AuthProviderIDs.GOOGLE);
						catchify(handleSocialAuth, AuthProviderIDs.GOOGLE);
					}}
				>
					Google
				</Button>
				<Button
					size='plg'
					isLoading={createSessionResult.isLoading || loadingProvider === AuthProviderIDs.FACEBOOK}
					isDisabled={createSessionResult.isLoading || loadingProvider !== null}
					background='blue.500'
					leftIcon={<IoLogoFacebook color='white' />}
					onClick={() => {
						setLoadingProvider(AuthProviderIDs.FACEBOOK);
						catchify(handleSocialAuth, AuthProviderIDs.FACEBOOK);
					}}
				>
					Facebook
				</Button>
				<Button
					size='plg'
					isLoading={createSessionResult.isLoading || loadingProvider === AuthProviderIDs.GITHUB}
					isDisabled={createSessionResult.isLoading || loadingProvider !== null}
					background='black'
					leftIcon={<IoLogoGithub />}
					onClick={() => {
						setLoadingProvider(AuthProviderIDs.GITHUB);
						catchify(handleSocialAuth, AuthProviderIDs.GITHUB);
					}}
				>
					Github
				</Button>
			</Box>
		</Box>
	);
};

export default LoginForm;
