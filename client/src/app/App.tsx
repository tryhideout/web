import { Box, ChakraProvider, UseToastOptions } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import {
	ChoresPage,
	ExpensesPage,
	LandingPage,
	LoginPage,
	SignupPage,
	OnboardingCreatePage,
	OnboardingInvitePage,
	OnboardingJoinPage,
} from '@/pages';
import { Sidebar } from '@/containers';
import { Gateway, Protected, TopBar } from '@/components';
import theme from '@/config/theme';
import { ToastDefaultOptions } from '@/utils/constants';

const InteriorLayout = () => (
	<Box display='flex' flexDirection='row'>
		<Sidebar />
		<Box display='flex' flexDirection='column' width='100%'>
			<TopBar />
			<Outlet />
		</Box>
	</Box>
);

const App = () => {
	return (
		<ChakraProvider theme={theme} toastOptions={{ defaultOptions: ToastDefaultOptions as UseToastOptions }}>
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
						path='/onboarding/join'
						element={
							<Protected>
								<OnboardingJoinPage />
							</Protected>
						}
					/>
					<Route
						path='/onboarding/create'
						element={
							<Protected>
								<OnboardingCreatePage />
							</Protected>
						}
					/>
					<Route
						path='/onboarding/invite'
						element={
							<Protected>
								<OnboardingInvitePage />
							</Protected>
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
