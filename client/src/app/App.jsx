import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LandingPage } from 'pages';
import { LoginPage } from 'pages';
import theme from 'config/theme';
import fonts from 'config/fonts.css';
import Signup from 'pages/Signup';
import JoinPage from 'pages/JoinPage';
import CreatePage from 'pages/CreatePage';
import InvitePage from 'pages/InvitePage';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/auth/login' element={<LoginPage />} />
                    <Route path="/auth/signup" element={<Signup />} />
					<Route path="/onboard/join" element={<JoinPage />} />
					<Route path="/onboard/create" element={<CreatePage />} />
					<Route path="/onboard/invite" element={<InvitePage />} />

				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
