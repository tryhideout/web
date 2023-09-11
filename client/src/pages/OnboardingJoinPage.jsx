import React from 'react';
import { Button, Input, Box, Link, Divider, Text, Heading, Image } from '@chakra-ui/react';

import single from 'assets/images/singleline.svg';

const OnboardingJoinPage = () => {
	// Refresh access token after joining
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
				<Box>
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
					/>
				</Box>
				<Button width='543px' variant='gradient500' mt='20px'>
					Join a Hideout
				</Button>
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
