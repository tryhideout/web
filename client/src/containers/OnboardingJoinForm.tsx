import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Input, useToast } from '@chakra-ui/react';

import { useJoinHideoutMutation } from '@/redux/api/hideouts';
import usersAPI from '@/redux/api/users';
import { ClientRoutes } from '@/utils/constants';
import { catchify, generateEmptyStringObject } from '@/utils/helpers/common';
import { OnboardingJoinFormState, RootState } from '@/utils/types';
import { store } from '@/redux/store';
import Toast from '@/utils/helpers/toast';
import adapters from '@/utils/helpers/adapters';

const initialFormState = generateEmptyStringObject(['joinCode']) as OnboardingJoinFormState;

const OnboardingJoinForm = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const currentUser = useSelector((state: RootState) => state.user);

	const [formState, setFormState] = useState(initialFormState);
	const [triggerJoinHideout, joinHideoutResult] = useJoinHideoutMutation();

	const handleJoinHideout = async () => {
		const requestBody = adapters.onboardingJoinHideoutRequest(formState);
		const joinHideoutPromise = triggerJoinHideout(requestBody).unwrap();
		store.dispatch(usersAPI.endpoints.getUser.initiate(currentUser.id!));

		Toast.showJoinHideoutPromiseToast(toast, joinHideoutPromise);
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
