import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormControl, Input, Button, Box, useToast } from '@chakra-ui/react';

import adapters from '@/utils/helpers/adapters';
import APIRequestHandler from '@/utils/helpers/requests';
import { useCreateHideoutMutation } from '@/redux/api/hideouts';
import { OnboardingCreateFormState, RootState, Session, User } from '@/utils/types';
import { ClientRoutes, CreateHideoutToastMessages } from '@/utils/constants';
import { catchify, generateEmptyStringObject } from '@/utils/helpers/common';

const initialFormState = generateEmptyStringObject(['hideoutName']) as OnboardingCreateFormState;

const OnboardingCreateForm = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestHandler = new APIRequestHandler(toast, dispatch);

	const [formState, setFormState] = useState(initialFormState);
	const currentUser: User = useSelector((state: RootState) => state.user);
	const session: Session = useSelector((state: RootState) => state.session);
	const [triggerCreateHideout, createHideoutResult] = useCreateHideoutMutation();

	/**
	 * Handles create hideout flow and toasts success / error result.
	 * Refreshes the user and session state after successful create hideout request.
	 * @async
	 */
	const handleCreateHideout = async () => {
		const requestBody = adapters.onboardingCreateHideoutRequest(formState, currentUser);
		const createHideoutPromise = triggerCreateHideout(requestBody).unwrap();
		await requestHandler.awaitAndToastRequest(createHideoutPromise, CreateHideoutToastMessages);

		await requestHandler.refreshUserAndSessionState(session);
		navigate(ClientRoutes.ONBOARDING_INVITE);
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<form>
				<FormControl isInvalid={true}>
					<Input
						value={formState.hideoutName}
						onChange={(e) => setFormState({ hideoutName: e.target.value })}
						placeholder='Hideout name'
						mt='30px'
						width='543px'
						color='gray.600'
						isRequired
					/>
					<Button
						width='543px'
						variant='gradient500'
						mt='20px'
						type='submit'
						isLoading={createHideoutResult.isLoading}
						isDisabled={createHideoutResult.isLoading}
						onClick={() => catchify(handleCreateHideout)}
					>
						Create your Hideout
					</Button>
				</FormControl>
			</form>
		</Box>
	);
};

export default OnboardingCreateForm;
