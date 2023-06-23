import React from 'react';
import { Input } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import logo from '../assets/images/logo.svg';
import { Button } from '@chakra-ui/react';

function Signup() {
	return (
		<Box>
			<img src={logo} alt='Logo' />
			<h1>
				Welcome to <span>Hideout</span>
			</h1>
			<p>To get started, enter in your details below or sign up by choosing a social provider.</p>
			<div>
				<div>
					<Input placeholder='First name'></Input>
					<Input placeholder='Last name'></Input>
				</div>
				<Input placeholder='Email address'></Input>
				<div>
					<Input placeholder='Password'></Input>
					<Input placeholder='Confirm password'></Input>
				</div>
			</div>
			<Button>Sign Up</Button>
			<hr></hr>
			<p>
				Already have an account? <a href='#'>Log in here</a>
			</p>
		</Box>
	);
}

export default Signup;
