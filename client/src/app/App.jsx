import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import { Chores, Dashboard, Expenses, LandingPage, LoginPage } from 'pages';
import { SideBar } from 'components';
import theme from 'config/theme';
import fonts from 'config/fonts.css';
import Signup from 'pages/Signup';

const InteriorLayout = () => (
	<>
		<SideBar />
		<Outlet />
	</>
);

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/auth/login' element={<LoginPage />} />
					<Route path='/auth/signup' element={<Signup />} />
					<Route path='/app' element={SideBar}>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/expenses' element={<Expenses />} />
						<Route path='/chores' element={<Chores />} />
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
