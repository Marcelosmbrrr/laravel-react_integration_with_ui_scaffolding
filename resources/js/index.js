import React from 'react';
import ReactDOM from 'react-dom';
// Chakra UI
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
// Routes
import {AppRoutes} from './components/routes/AppRoutes';

const colors = {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
}

const theme = extendTheme({ colors })

export function Index() {

    return (
        <ChakraProvider theme={theme}>
            <AppRoutes />
        </ChakraProvider>
    );
}

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
