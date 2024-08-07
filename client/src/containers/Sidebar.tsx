import { Box, Icon, Image, Text } from '@chakra-ui/react';
import { HiDotsVertical } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { RootState, User } from '@/utils/types';
import logo from '@/assets/images/logo.svg';
import { SidebarTile } from '@/components';

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
					<Box display='flex' flexDirection='column' pt='4px'>
						<Text fontFamily='Hellix' color='white' fontSize='16px' fontWeight='600' lineHeight='1.25rem'>
							{`${currentUser.firstName} ${currentUser.lastName}`}
						</Text>
						<Text fontFamily='Hellix' color='gray.500' fontSize='11px' fontWeight='500'>
							{currentUser.email}
						</Text>
					</Box>
					<Icon as={HiDotsVertical} color='gray.500' marginLeft='34px' />
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
