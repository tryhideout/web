import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import logo from '../assets/images/logo.svg';
import threeDotsIcon from '../assets/images/three-dots.svg';
import SideBarTile from './SideBarTile';

function SideBar() {
	return (
		<Box backgroundColor='#171923' height='100vh' width='15%' minWidth='12.5rem' display='flex' flexDirection='column'>
			<Box display='flex' justifyContent='center' py='1.2rem' paddingRight='1.3rem' flex='0.05'>
				<Image src={logo} alt='Logo' height='2rem' marginRight='0.6rem' />
				<Text fontFamily='Hellix' fontSize='1.5rem' fontWeight='500' lineHeight='2rem' color='#ffffff'>
					Hideout
				</Text>
			</Box>
			<Box
				color='gray.500'
				pt='1.2rem'
				pl='1rem'
				flex='0.9'
				borderColor='rgba(45, 55, 72, 0.50)'
				borderBottomWidth='0.1rem'
				borderTopWidth='0.1rem'
				display='flex'
				flexDirection='column'
				gap='0.4rem'
			>
				<Text fontFamily='Hellix' fontSize='0.5rem' lineHeight='1rem' fontWeight='600' letterSpacing='0.025rem'>
					GENERAL
				</Text>
				<SideBarTile title='dashboard'></SideBarTile>
				<SideBarTile title='expenses'></SideBarTile>
				<SideBarTile title='chores'></SideBarTile>
			</Box>
			<Box display='flex' alignItems='center' pl='1rem' justifyContent='space-evenly' pb='1.5rem' pt='1rem' flex='0.05'>
				<Box>
					<Text color='white' fontSize='0.875rem' fontWeight='600' lineHeight='1.25rem'>
						Muhammad Ibrahim
					</Text>
					<Text color='gray.500' fontSize='0.5625rem' fontWeight='500'>
						ibrahim.balutch@gmail.com
					</Text>
				</Box>
				<Image src={threeDotsIcon} alt='Logo' boxSize='1.5rem' flex='1' />
			</Box>
		</Box>
	);
}

export default SideBar;
