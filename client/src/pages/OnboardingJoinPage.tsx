import { useState } from 'react';
import { Button, Input, Box, Link, Divider, Text, Heading, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import single from '@/assets/images/singleline.svg';
import { ClientRoutes } from '@/utils/constants';
import { OnboardingJoinForm } from '@/containers';

const OnboardingJoinPage = () => {
	const [joinCode, setJoinCode] = useState('');
	const [formLoading, setFormLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormLoading(true);
		setFormLoading(false);
		navigate(ClientRoutes.EXPENSES);
	};

	return (
		<Box display='flex' alignItems='center' justifyContent='center' height='100vh' width='100vw'>
			<Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' maxWidth='550px'>
				<Box flex='0.2'>
					<Image src={single} alt='Single' />
				</Box>
				<Heading mt='30px' size='2xl'>
					Join a Hideout
				</Heading>
				<Box maxWidth='530px' fontFamily='Hubot' fontSize='20px' textAlign='center' mt='17px'>
					To continue, either join a hideout by entering in the join code below or switch to creating a new one.
				</Box>
				<OnboardingJoinForm />
				<Divider width='90%' mt='32px' />
				<Text mt='17px' fontFamily='Hubot' fontSize='16px' mb='20px'>
					Don't have a hideout?{' '}
					<Link href='/onboarding/create' color='blue.400' fontWeight='bold'>
						Create one here.
					</Link>
				</Text>
			</Box>
		</Box>
	);
};

export default OnboardingJoinPage;
