import { useEffect } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import treeIcon from '@/assets/images/tree-icon.svg';
import userImage from '@/assets/images/user-image.svg';

const TopBar = () => {
	const pathnameArray = useLocation().pathname.split('/');
	const currentTab =
		pathnameArray[pathnameArray.length - 1].charAt(0).toUpperCase() + pathnameArray[pathnameArray.length - 1].slice(1);

	useEffect(() => {
		const loadData = async () => {
			// if (user.hideoutID !== null && hideout.name === null) await loadHideoutData(user.hideoutID);
		};
		loadData().catch(console.error);
	}, []);

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
			{/* <Box display='flex' alignItems='center' gap='0.8rem'>
				<Text fontSize='1.25rem' fontWeight='500' mb='0.2rem' lineHeight='1.75rem'>
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
					<Text fontSize='0.75rem' fontWeight='600' lineHeight='1rem'>
						{hideout.name || ''}
					</Text>
				</Box>
			</Box>
			<Box flex='1'></Box>
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
			</Box> */}
		</Box>
	);
};

export default TopBar;
