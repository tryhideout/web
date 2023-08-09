import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import dashboardIcon from '../assets/images/dashboard-icon.svg';
import expensesIcon from '../assets/images/expenses-icon.svg';
import choreIcon from '../assets/images/chores-icon.svg';

import dashboardIconSelected from '../assets/images/dashboard-icon-selected.svg';
import expensesIconSelected from '../assets/images/expenses-icon-selected.svg';
import choreIconSelected from '../assets/images/chores-icon-selected.svg';
import { Link, useLocation } from 'react-router-dom';

const titleToImage = {
	dashboard: dashboardIcon,
	expenses: expensesIcon,
	chores: choreIcon,
};

const titleToSelectedImage = {
	dashboard: dashboardIconSelected,
	expenses: expensesIconSelected,
	chores: choreIconSelected,
};

function SideBarTile({ title }) {
	const currentTab = useLocation().pathname.slice(1);

	return (
		<Link to={'/' + title}>
			{currentTab === title ? (
				<Box display='flex' padding="0.4375rem 6.125rem 0.4375rem 0.625rem" backgroundColor='rgba(45, 55, 72, 0.50)' borderRadius="0.5rem" mr="0.6rem">
					<Image src={titleToSelectedImage[title]} alt='Logo' mr='0.6rem' boxSize='1.125rem' />
					<Text
						fontSize='0.875rem'
						fontWeight='600'
						lineHeight='1.25rem'
						bgClip='text'
						bgGradient='linear(to-r, #F8A11E, #F8861E)'
					>
						{title.charAt(0).toUpperCase() + title.slice(1)}
					</Text>
				</Box>
			) : (
				<Box display='flex' padding="0.4375rem 6.125rem 0.4375rem 0.625rem" borderRadius="0.5rem" mr="0.65rem">
					<Image src={titleToImage[title]} alt='Logo' mr='0.6rem' boxSize='1.125rem' borderRadius="0.5rem"/>
					<Text fontSize='0.875rem' fontWeight='600' lineHeight='1.25rem'>
						{title.charAt(0).toUpperCase() + title.slice(1)}
					</Text>
				</Box>
			)}
		</Link>
	);
}

export default SideBarTile;
