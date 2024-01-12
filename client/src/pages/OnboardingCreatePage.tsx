import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Box, Link, Divider, Text, Heading, Image, FormControl } from '@chakra-ui/react';

import single from 'assets/images/singleline.svg';

const OnboardingCreatePage = () => {
	const [hideoutName, setHideoutName] = useState('');
	const [formLoading, setFormLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormLoading(true);
		setFormLoading(false);
		navigate('/app/expenses');
	};

	return (
		<Box display='flex' alignItems='center' justifyContent='center' height='100vh' width='100vw'>
			<Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' maxWidth='550px'>
				<Box flex='0.2'>
					<Image src={single} alt='Single' />
				</Box>
				<Heading mt='30px' size='2xl'>
					Create a Hideout
				</Heading>
				<Box maxWidth='530px' fontFamily='Hubot' fontSize='20px' textAlign='center' mt='17px'>
					To continue, either create a hideout by choosing a name below or switch to joining an existing one.
				</Box>
				<form onSubmit={handleSubmit}>
					<FormControl isInvalid={true}>
						<Input
							value={hideoutName}
							onChange={(e) => setHideoutName(e.target.value)}
							placeholder='Hideout name'
							mt='30px'
							width='543px'
							color='gray.600'
							isRequired
						/>
						<Button width='543px' variant='gradient500' mt='20px' type='submit' isLoading={formLoading}>
							Create your Hideout
						</Button>
					</FormControl>
				</form>
				<Divider maxWidth='90%' mt='32px' />
				<Text mt='17px' fontFamily='Hubot' fontSize='16px' mb='20px'>
					Already have a hideout?{' '}
					<Link href='/onboarding/join' color='blue.400' fontWeight='bold'>
						Join it here.
					</Link>
				</Text>
			</Box>
		</Box>
	);
};

export default OnboardingCreatePage;
