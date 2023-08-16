import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import { ChoresPage, ExpensesPage, LandingPage, LoginPage, SignupPage } from 'pages';
import { SideBar, TopBar } from 'components';
import { Gateway, Protected } from 'components';
import theme from 'config/theme';

const InteriorLayout = () => (
	<Box display='flex' flexDirection='row'>
		<SideBar />
		<Box display='flex' flexDirection='column' width='100%'>
			<TopBar />
			<Outlet />
		</Box>
	</Box>
);

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
					<Route path='/' element={InteriorLayout()}>
						<Route
							path='/app/expenses'
							element={
								<Protected>
									<ExpensesPage />
								</Protected>
							}
						/>
						<Route
							path='/app/chores'
							element={
								<Protected>
									<ChoresPage />
								</Protected>
							}
						/>
						<Route
							path='/app/settings'
							element={
								<Protected>
									<h1>Settings Modal</h1>
								</Protected>
							}
						/>
						<Route
							path='/app/feedback'
							element={
								<Protected>
									<h1>Feedback Modal</h1>
								</Protected>
							}
						/>
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
