import React from 'react';
import { Box, Button, Center, Divider, Input } from '@chakra-ui/react';

function LoginContent() {
	return (
		<Center>
			<Box>
				<Input placeholder='Email' mb='1rem' />
				<Input type='password' placeholder='Password' mb='1rem' />
				<Button
					minWidth='55%'
					bgGradient='linear(to-r, #F8A11E, #F8861E)'
					_hover={{ bgGradient: 'linear(to-r, #F8861E, #F8A11E)' }}
					color='white'
					my='1rem'
				>
					Log In
				</Button>
				<Divider my='1rem' maxWidth='55%' />
			</Box>
		</Center>
	);
}

export default LoginContent;
