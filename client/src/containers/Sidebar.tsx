import { Box, Image, Text } from '@chakra-ui/react';

import { SidebarTile } from '@/components';
import logo from '@/assets/images/logo.svg';
import userImage from '@/assets/images/user-image.svg';
import { RootState, User } from '@/utils/types';
import { useSelector } from 'react-redux';

const Sidebar = () => {
	const currentUser: User = useSelector((state: RootState) => state.user);
	return (
		<Box backgroundColor='#171923' height='100vh' width='260px' display='flex' flexDirection='column'>
			<Box display='flex' alignItems='center' justifyContent='center' py='1.2rem' paddingRight='1.3rem' flex='0.05'>
				<Image src={logo} alt='Logo' height='35px' marginRight='0.6rem' />
				<Text fontFamily='Hellix' fontSize='26px' fontWeight='500' lineHeight='2rem' color='#ffffff'>
					Hideout
				</Text>
			</Box>
			<Box
				color='gray.500'
				pt='1.2rem'
				pl='1rem'
				flex='0.9'
				borderColor='whiteAlpha.200'
				borderTopWidth='0.1rem'
				display='flex'
				flexDirection='column'
				gap='0.4rem'
			>
				<Text fontFamily='Hellix' fontSize='10px' lineHeight='1rem' fontWeight='600' letterSpacing='0.025rem'>
					GENERAL
				</Text>
				<SidebarTile title='expenses'></SidebarTile>
				<SidebarTile title='chores'></SidebarTile>
				<Text fontFamily='Hellix' fontSize='10px' lineHeight='1rem' fontWeight='600' letterSpacing='0.025rem' mt='19px'>
					SUPPORT
				</Text>
				<SidebarTile title='settings'></SidebarTile>
				<SidebarTile title='feedback'></SidebarTile>
			</Box>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				width='260px'
				mt='auto'
				mb='24px'
				borderColor='whiteAlpha.200'
				borderTopWidth='0.1rem'
				pt='24px'
			>
				<Box display='flex' gap='15px' flexDirection='row' alignItems='center' ml='15px' mr='auto'>
					<Box
						backgroundColor={`${currentUser.color}.500`}
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
					<Box display='flex' flexDirection='column' pt='4px'>
						<Text color='white' fontSize='16px' fontWeight='600' lineHeight='1.25rem'>
							{`${currentUser.firstName} ${currentUser.lastName}`}
						</Text>
						<Text color='gray.500' fontSize='11px' fontWeight='500'>
							{currentUser.email}
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
