import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Chores, Dashboard, Expenses, LandingPage } from 'pages';
import { LoginPage } from 'pages';
import theme from 'config/theme';
import fonts from 'config/fonts.css';
import Signup from 'pages/Signup';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/auth/login' element={<LoginPage />} />
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/chores" element={<Chores />} />
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
