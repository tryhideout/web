import { Box, Button, Text, Link, Input } from '@chakra-ui/react';
import LogoImage from 'assets/images/Logo.svg';

const LandingHeader = () => {
	return (
		<Box display='flex' flexDirection='row' alignItems='center' marginTop='40px'>
			<Box display='flex' flexDirection='row' alignItems='center' marginLeft='40px' justifyContent='space-between' gap='80px'>
				<img src={LogoImage} alt='Tree icon on a orange gradient background' />
				<Link fontWeight='600' fontSize='24px'>
					Features
				</Link>
				<Link fontWeight='600' fontSize='24px'>
					About
				</Link>
				<Link fontWeight='600' fontSize='24px'>
					Contact
				</Link>
			</Box>
			<Box
				display='flex'
				flexDirection='row'
				alignItems='center'
				marginLeft='auto'
				marginRight='30px'
				justifyContent='space-between'
				gap='40px'
			>
				<Link fontWeight='600' fontSize='24px'>
					Log In
				</Link>
				<Button>Sign Up</Button>
			</Box>
		</Box>
	);
};

export default LandingHeader;
