import { Box, Image, Text } from '@chakra-ui/react';
import UserImage from '../assets/images/user-image-red.svg';
import NotificationIcon from '../assets/images/notification-icon.svg';
import SettingsIcon from '../assets/images/settings-icon-grey.svg';

import theme from '@/config/theme';

function TopBar() {
	return (
		<Box display='flex' flexDirection='row' justifyContent='space-between' alignContent="baseline">
			<Box display='flex' flexDirection='row'>
				<Box>
					<Text fontSize="20px" fontWeight="500">Chores</Text>
				</Box>
				<Box bg="gray.900" color="white" borderRadius="8px" padding="5px 10px" fontFamily="Hellix">
					<Text>347 Grace Street</Text>
				</Box>
			</Box>

			<Box display='flex' flexDirection='row'>
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
