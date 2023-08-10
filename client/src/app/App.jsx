import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LandingPage, LoginPage, SignupPage, DashboardPage } from 'pages';
import { Gateway, Protected } from 'components';
import theme from 'config/theme';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route
						path='/auth/login'
						element={
							<Gateway>
								<LoginPage />
							</Gateway>
						}
					/>
					<Route
						path='/auth/signup'
						element={
							<Gateway>
								<SignupPage />
							</Gateway>
						}
					/>
					<Route
						path='/app/dashboard'
						element={
							<Protected>
								<DashboardPage />
							</Protected>
						}
					/>
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
