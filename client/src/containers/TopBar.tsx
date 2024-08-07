import { Box, Icon, Image, Text } from '@chakra-ui/react';
import { IoNotifications } from 'react-icons/io5';
import { FaRegLifeRing } from 'react-icons/fa';

import treeIcon from '@/assets/images/tree-icon.svg';
import userImage from '@/assets/images/user-image.svg';
import { useCurrentTab } from '@/utils/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/types';

const TopBar = () => {
	const currentTab = useCurrentTab();
	const hideout = useSelector((state: RootState) => state.hideout);
	const user = useSelector((state: RootState) => state.user);

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
				<Text fontFamily='Hellix' fontSize='1.25rem' fontWeight='500' mb='0.2rem' lineHeight='1.75rem'>
					{currentTab}
				</Text>
				<Box
					backgroundColor='#171923'
					display='flex'
					color='white'
					py='0.3125rem'
					px='0.625rem'
					borderRadius='10px'
					gap='0.31rem'
					mb='2px'
				>
					<Image src={treeIcon} alt='Logo' />
					<Text fontFamily='Hellix' fontSize='0.75rem' fontWeight='600' lineHeight='1rem'>
						{hideout.name || ''}
					</Text>
				</Box>
			</Box>
			<Box display='flex' flexDir='row' alignItems='center' gap='20px'>
				<Icon
					as={FaRegLifeRing}
					color='gray.700'
					w='32px'
					h='32px'
					borderRadius='10px'
					padding='6px'
					backgroundColor='gray.200'
				/>
				<Icon
					as={IoNotifications}
					color='gray.700'
					w='32px'
					h='32px'
					borderRadius='10px'
					padding='6px'
					backgroundColor='gray.200'
				/>
				<Box
					backgroundColor={`${user.color}.500`}
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
		</Box>
	);
};

export default TopBar;
