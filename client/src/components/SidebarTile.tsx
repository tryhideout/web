import { Box, Image, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

import expensesIcon from '@/assets/images/expenses-icon.svg';
import choreIcon from '@/assets/images/chores-icon.svg';
import settingsIcon from '@/assets/images/settings-icon.svg';
import feedbackIcon from '@/assets/images/feedback-icon.svg';
import expensesIconSelected from '@/assets/images/expenses-icon-selected.svg';
import choreIconSelected from '@/assets/images/chores-icon-selected.svg';
import settingsIconSelected from '@/assets/images/settings-icon-selected.svg';
import feedbackIconSelected from '@/assets/images/feedback-icon-selected.svg';
import { useCurrentTab } from '@/utils/hooks';

interface titleImageAdapter {
	expenses: string;
	chores: string;
	settings: string;
	feedback: string;
}

type titleProp = 'expenses' | 'chores' | 'settings' | 'feedback';

const titleToImage: titleImageAdapter = {
	expenses: expensesIcon,
	chores: choreIcon,
	settings: settingsIcon,
	feedback: feedbackIcon,
};

const titleToSelectedImage: titleImageAdapter = {
	expenses: expensesIconSelected,
	chores: choreIconSelected,
	settings: settingsIconSelected,
	feedback: feedbackIconSelected,
};

function SideBarTile({ title }: { title: titleProp }) {
	const currentTab = useCurrentTab();

	return (
		<Link to={'/app/' + title}>
			{currentTab.toLowerCase() === title ? (
				<Box
					display='flex'
					padding='0.4375rem 6.125rem 0.4375rem 0.625rem'
					backgroundColor='rgba(45, 55, 72, 0.50)'
					borderRadius='10px'
					mr='0.6rem'
					height='34px'
					alignItems='center'
				>
					<Image src={titleToSelectedImage[title]} alt='Logo' mr='0.6rem' boxSize='20px' />
					<Text
						fontSize='16px'
						fontWeight='600'
						lineHeight='1.25rem'
						bgClip='text'
						fontFamily='Hellix'
						bgGradient={
							title === 'settings' || title === 'feedback'
								? 'linear-gradient(180deg, #1E82F8 0%, #1E68F8 100%)'
								: 'linear-gradient(180deg, #F8A11E 0%, #F8861E 100%)'
						}
					>
						{title.charAt(0).toUpperCase() + title.slice(1)}
					</Text>
				</Box>
			) : (
				<Box display='flex' padding='0.4375rem 6.125rem 0.4375rem 0.625rem' borderRadius='10px' mr='0.65rem'>
					<Image src={titleToImage[title]} alt='Logo' mr='0.6rem' boxSize='20px' borderRadius='0.5rem' />
					<Text fontFamily='Hellix' fontSize='16px' fontWeight='600' lineHeight='1.25rem'>
						{title.charAt(0).toUpperCase() + title.slice(1)}
					</Text>
				</Box>
			)}
		</Link>
	);
}

export default SideBarTile;
