import React from 'react';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import logoNoBg from '../assets/images/logo-no-bg.svg';
import userImage from '../assets/images/user-image.svg';
import { useLocation } from 'react-router-dom';

function Topbar() {
	const currentTab = useLocation().pathname.charAt(1).toUpperCase() + useLocation().pathname.slice(2);

	return (
		<Box
			display='flex'
			width='100%'
			justifyContent='space-between'
			alignItems='center'
			pl='2.18rem'
			py='0.6rem'
			pr='1.06rem'
			borderBottomWidth='0.265px'
			borderColor='gray.200'
		>
			<Box display='flex' alignItems='center' gap='0.8rem'>
				<Text fontSize='1.25rem' fontWeight='500' mb='0.2rem' lineHeight='1.75rem'>
					{currentTab}
				</Text>
				<Box
					backgroundColor='#171923'
					display='flex'
					color='white'
					boxSize='fit-content'
					py='0.3125rem'
					px='0.625rem'
					borderRadius='0.5rem'
					gap='0.31rem'
				>
					<Image src={logoNoBg} alt='Logo' />
					<Text fontSize='0.75rem' fontWeight='600' lineHeight='1rem'>
						347 Grace Street
					</Text>
				</Box>
			</Box>
			<Box flex='1'></Box>
			<Box
				backgroundColor='red.500'
				width='2.5rem'
				height='2.5rem'
				padding='0.625rem'
				display='flex'
				justifyContent='center'
				alignItems='center'
				borderRadius='0.875rem'
				mt='0.15rem'
			>
				<Image src={userImage} />
			</Box>
		</Box>
	);
}

export default Topbar;
