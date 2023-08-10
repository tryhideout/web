import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LandingPage } from 'pages';
import { LoginPage } from 'pages';
import theme from 'config/theme';
import { SignupPage } from 'pages';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/auth/login' element={<LoginPage />} />
					<Route path='/auth/signup' element={<SignupPage />} />
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
