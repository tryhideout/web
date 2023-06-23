import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LandingPage } from 'pages';
import theme from 'config/theme';
import fonts from 'config/fonts.css';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={<LandingPage />} />
				</Routes>
			</Router>
		</ChakraProvider>
	);
};

export default App;
