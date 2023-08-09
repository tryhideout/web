import React from 'react';
import { Box } from '@chakra-ui/react';

import SideBar from 'components/SideBar';
import Topbar from 'components/Topbar';

function Chores() {
	return (
		<Box display="flex" alignItems="flex-start">
			<SideBar></SideBar>
			<Topbar></Topbar>
		</Box>
	);
}

export default Chores;
