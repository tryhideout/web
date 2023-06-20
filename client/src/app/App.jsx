import { ChakraProvider, Box, Input } from '@chakra-ui/react';
import theme from 'config/theme';
import fonts from 'config/fonts';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Box bg='gradient' fontFamily='heading' fontWeight='400'>
				Welcome
			</Box>
		</ChakraProvider>
	);
};

export default App;
