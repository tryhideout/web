import { useJoinHideoutMutation } from '@/redux/api/hideouts';
import { ClientRoutes } from '@/utils/constants';
import adapters from '@/utils/helpers/adapters';
import { catchify, generateEmptyStringObject } from '@/utils/helpers/common';
import Toast from '@/utils/helpers/toast';
import { OnboardingJoinFormState } from '@/utils/types';
import { Box, Button, FormControl, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormState = generateEmptyStringObject(['joinCode']) as OnboardingJoinFormState;

const OnboardingJoinForm = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const [formState, setFormState] = useState(initialFormState);
	const [triggerJoinHideout, joinHideoutResult] = useJoinHideoutMutation();

	const handleJoinHideout = async () => {
		const requestBody = adapters.onboardingJoinHideoutRequest(formState);
		const joinHideoutPromise = triggerJoinHideout(requestBody).unwrap();

		Toast.showJoinHideoutPromiseToast(toast, joinHideoutPromise);
		navigate(ClientRoutes.EXPENSES);
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<form onSubmit={() => catchify(handleJoinHideout)}>
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
						type='submit'
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
