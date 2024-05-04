import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Image, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';

import { RootState } from '@/utils/types';
import { ClientRoutes } from '@/utils/constants';
import double from '@/assets/images/doubleline.svg';

const OnboardingInvitePage = () => {
	const navigate = useNavigate();
	const [copyButtonClicked, setCopyButtonClicked] = useState(false);
	const hideout = useSelector((state: RootState) => state.hideout);

	/**
	 * Copies the current hideout join code to the user's clipboard.
	 */
	const handleCopyAction = () => {
		navigator.clipboard.writeText(hideout.joinCode!);
		setCopyButtonClicked(true);
		setTimeout(() => setCopyButtonClicked(false), 1000);
	};

	return (
		<Box display='flex' alignItems='center' justifyContent='center' height='100vh' width='100vw'>
			<Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' maxWidth='550px'>
				<Box flex='0.2'>
					<Image src={double} alt='Single' />
				</Box>
				<Heading mt='30px' size='2xl'>
					Invite your friends
				</Heading>
				<Box maxWidth='550px' fontFamily='Hubot' fontSize='20px' textAlign='center' mt='17px'>
					Let's invite some of your roommates to join<br></br>{' '}
					<span style={{ fontWeight: 'bold', fontFamily: 'Hellix' }}>{hideout.name || ''}</span>! Send them the below join
					code.
				</Box>
				<Box>
					<InputGroup mt='30px'>
						<Input
							readOnly
							_hover={{ cursor: 'default' }}
							pr='4.5rem'
							width='543px'
							textAlign='center'
							textTransform='uppercase'
							color='gray.600'
							fontWeight='bold'
							letterSpacing='5px'
							value={hideout.joinCode || ''}
						/>
						<InputRightElement width='4.5rem' mr={copyButtonClicked ? '13px' : '6px'}>
							<Button
								disabled={hideout.joinCode === null || copyButtonClicked}
								transition='width 0.3s ease-in-out'
								variant='black'
								h='28px'
								size='sm'
								onClick={handleCopyAction}
							>
								{copyButtonClicked ? 'Copied!' : 'Copy'}
							</Button>
						</InputRightElement>
					</InputGroup>
				</Box>
				<Button width='543px' variant='gradient500' mt='30px' onClick={() => navigate(ClientRoutes.EXPENSES)}>
					Next
				</Button>
			</Box>
		</Box>
	);
};

export default OnboardingInvitePage;
