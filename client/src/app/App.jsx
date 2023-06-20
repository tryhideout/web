import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from 'config/theme';
import fonts from 'config/fonts';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Box>Hello World</Box>
		</ChakraProvider>
	);
};

export default App;
