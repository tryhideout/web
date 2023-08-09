import React from 'react';
import { Box } from '@chakra-ui/react';

import SideBar from 'components/SideBar';
import Topbar from 'components/Topbar';

function Dashboard() {
	return (
		<Box display="flex" alignItems="flex-start">
			<SideBar></SideBar>
			<Topbar></Topbar>
		</Box>
	);
}

export default Dashboard;
