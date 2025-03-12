import { Box, Image, PlacementWithLogical, Tooltip } from '@chakra-ui/react';

import { User } from '@/utils/types';
import userImage from '@/assets/images/user-image.svg';
import { UserStatusColorMappings } from '@/utils/constants';

const Avatar = ({ user, tooltipPlacement }: { user: User; tooltipPlacement: string }) => {
	const generateReadableStatus = () => {
		if (user.status) {
			const spacedStatus = user.status.replace('_', ' ');
			return spacedStatus.charAt(0).toUpperCase() + spacedStatus.slice(1);
		} else {
			return 'Unknown';
		}
	};

	return (
		<Tooltip label={generateReadableStatus()} placement={tooltipPlacement as PlacementWithLogical}>
			<Box width='40px' height='40px' position='relative'>
				<Box
					backgroundColor={`${user.color}.500`}
					width='40px'
					height='40px'
					borderRadius='14px'
					display='flex'
					alignItems='center'
					justifyContent='center'
				>
					<Image src={userImage} width='16px' height='20px' />
				</Box>
				<Box
					width='10px'
					height='10px'
					borderRadius='20px'
					position='absolute'
					top='0px'
					right='0px'
					display='flex'
					alignItems='center'
					justifyContent='center'
					backgroundColor={user.status ? UserStatusColorMappings[user.status] : 'none'}
				>
					{user.status === 'do_not_disturb' && (
						<Box height='1.5px' width='5px' backgroundColor='gray.900' borderRadius='10px' />
					)}
				</Box>
			</Box>
		</Tooltip>
	);
};

export default Avatar;
