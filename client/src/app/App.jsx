import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from 'config/theme';
import fonts from 'config/fonts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from 'pages/Signup';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/auth/signup" element={<Signup />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
};

export default App;
