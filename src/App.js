import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import AppRoutes from '../src/Routes/Rotas';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes></AppRoutes>      
    </ChakraProvider>

  );
}

export default App;
