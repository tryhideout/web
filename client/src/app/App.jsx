import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import { ChoresPage, DashboardPage, ExpensesPage, LandingPage, LoginPage, SignupPage } from 'pages';
import { SideBar } from 'components';
import { Gateway, Protected } from 'components';
import theme from 'config/theme';

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
					<Route path='/app' element={InteriorLayout}>
						<Route
							path='/dashboard'
							element={
								<Protected>
									<DashboardPage />
								</Protected>
							}
						/>
						<Route
							path='/expenses'
							element={
								<Protected>
									<ExpensesPage />
								</Protected>
							}
						/>
						<Route
							path='/chores'
							element={
								<Protected>
									<ChoresPage />
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
