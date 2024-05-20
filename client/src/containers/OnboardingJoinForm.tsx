import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Input, useToast } from '@chakra-ui/react';

import adapters from '@/utils/helpers/adapters';
import APIRequestHandler from '@/utils/helpers/requests';
import { useJoinHideoutMutation } from '@/redux/api/hideouts';
import { OnboardingJoinFormState, RootState, Session } from '@/utils/types';
import { ClientRoutes, JoinHideoutToastMessages } from '@/utils/constants';
import { catchify, generateEmptyStringObject } from '@/utils/helpers/common';

const initialFormState = generateEmptyStringObject(['joinCode']) as OnboardingJoinFormState;

const OnboardingJoinForm = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestHandler = new APIRequestHandler(toast, dispatch);

	const [formState, setFormState] = useState(initialFormState);
	const session: Session = useSelector((state: RootState) => state.session);
	const [triggerJoinHideout, joinHideoutResult] = useJoinHideoutMutation();

	/**
	 * Handles join hideout flow and toasts success / error result.
	 * Refreshes the user and session state after successful join hideout request.
	 * @async
	 */
	const handleJoinHideout = async () => {
		const requestBody = adapters.onboardingJoinHideoutRequest(formState);
		const joinHideoutPromise = triggerJoinHideout(requestBody).unwrap();
		await requestHandler.awaitAndToastRequest(joinHideoutPromise, JoinHideoutToastMessages);

		await requestHandler.refreshUserAndSessionState(session);
		navigate(ClientRoutes.EXPENSES);
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<form>
				<FormControl isInvalid={true}>
					<Input
						placeholder='Enter a join code'
						_placeholder={{ textTransform: 'none', letterSpacing: '0px', fontWeight: 'medium' }}
						mt='30px'
						width='543px'
						textAlign='center'
						textTransform='uppercase'
						color='gray.600'
						fontWeight='bold'
						letterSpacing='5px'
						value={formState.joinCode}
						onChange={(e) => setFormState({ joinCode: e.target.value })}
						isRequired
					/>
					<Button
						onClick={() => catchify(handleJoinHideout)}
						isLoading={joinHideoutResult.isLoading}
						isDisabled={joinHideoutResult.isLoading}
						width='543px'
						variant='gradient500'
						mt='20px'
					>
						Join a Hideout
					</Button>
				</FormControl>
			</form>
		</Box>
	);
};

export default OnboardingJoinForm;
