import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Box, Link, Divider, Text, Center, Heading, Image, FormControl, Input } from '@chakra-ui/react';

import { logInWithCredentials } from 'redux/actions/authActions';
import logo from 'assets/images/logo.svg';

const LoginPage = (props) => {
	const { logInWithCredentials } = props;
	const [inputState, setInputState] = useState({ email: '', password: '' });
	const [formLoading, setFormLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormLoading(true);
		await logInWithCredentials(inputState.email, inputState.password);
		setFormLoading(false);
	};

	return (
		<Center>
			<Center flexDirection='column' height='100vh' width='fit-content'>
				<Image src={logo} alt='Logo' />
				<Heading size='2xl' mt='36px'>
					Log in to{' '}
					<Text display='inline-block' bgGradient='linear(to-r, #F8A11E, #F8861E)' bgClip='text'>
						Hideout
					</Text>
				</Heading>
				<Box maxW='578px' textAlign='center' fontFamily='Hubot' fontSize='20px' mt='17px'>
					Enter your details below to log back in. If you forgot your password, just click the link at the bottom of the page.
				</Box>
				<Box maxW='547px' display='flex' flexDirection='column' alignItems='center' mt='25px'>
					<form onSubmit={handleSubmit}>
						<FormControl isInvalid={true}>
							{' '}
							<Input
								value={inputState.email}
								onChange={(e) => setInputState({ ...inputState, email: e.target.value })}
								placeholder='Email address'
								mb='1rem'
								isRequired
							/>
							<Input
								value={inputState.password}
								onChange={(e) => setInputState({ ...inputState, password: e.target.value })}
								type='password'
								placeholder='Password'
								isRequired
							/>
							<Button width='100%' variant='gradient400' mt='25px' isLoading={formLoading} type='submit'>
								Log In
							</Button>
						</FormControl>
					</form>
					<Divider mt='32px' w='90%' borderWidth='1.5px' borderStyle='solid' borderRadius='5' />
				</Box>
				<Text fontFamily='Hubot' mt='17px' fontSize='18px'>
					Don't have an account?{' '}
					<Link href='/auth/signup' color='#4299E1' fontWeight='bold'>
						Sign up here
					</Link>
				</Text>
			</Center>
		</Center>
	);
};

export default connect(null, { logInWithCredentials })(LoginPage);
