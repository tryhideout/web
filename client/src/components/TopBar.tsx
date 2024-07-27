import { Box, Image, Text } from '@chakra-ui/react';
import UserImage from '../assets/images/user-image-red.svg';
import NotificationIcon from '../assets/images/notification-icon.svg';
import SettingsIcon from '../assets/images/settings-icon-grey.svg';
import BlackLeaf from '../assets/images/leaf-black.svg';

function TopBar() {
	return (
		<Box
			display='flex'
			justifyContent='space-between'
			alignContent='baseline'
			padding='12px 17px 11px 36px'
			borderBottomWidth='0.265px'
			borderColor='gray.200'
		>
			<Box display='flex' gap='14px' alignItems='center'>
				<Box>
					<Text fontSize='20px' fontWeight='500' lineHeight='28px' fontFamily='Hellix'>
						Chores
					</Text>
				</Box>
				<Box
					bg='gray.900'
					color='white'
					borderRadius='8px'
					padding='5px 10px'
					fontFamily='Hellix'
					display='flex'
					flexDirection='row'
					alignItems='center'
					justifyContent='center'
					gap='5px'
				>
					<Image src={BlackLeaf} />
					<Text>347 Grace Street</Text>
				</Box>
			</Box>

			<Box display='flex' gap='19px' alignItems='center' justifyContent='center'>
				<Box>
					<Image src={SettingsIcon} />
				</Box>
				<Box>
					<Image src={NotificationIcon} />
				</Box>
				<Box>
					<Image src={UserImage} />
				</Box>
			</Box>
		</Box>
	);
}

export default TopBar;