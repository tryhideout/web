import React from 'react';
import { Box } from '@chakra-ui/react';
import { SideBar } from 'components';
import Topbar from 'components/TopBar';
import { Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from '@chakra-ui/react';
import Chore from 'components/Chore';


const ChoresPage = () => {
	

	return <Box display='flex' alignItems='flex-start'>
		<Accordion allowToggle>
		<AccordionItem>
			<h2>
			<AccordionButton>
				<Box as="span" flex='1' textAlign='left'>
				Backlog
				</Box>
				<AccordionIcon />
			</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
			<Chore />
			</AccordionPanel>		

			
		</AccordionItem>

		</Accordion>
	</Box>;
};

export default ChoresPage;
