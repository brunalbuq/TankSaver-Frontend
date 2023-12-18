import React from 'react';
import {
    ChakraProvider,
    theme,
    Box,
} from '@chakra-ui/react';
import logo from '../../image/logo.svg';

function Rodape() {
    return (
        <ChakraProvider theme={theme}>
            <Box
                position="absolute"
                bottom="0"
                left="50%"
                transform="center" 
                p="2"
                zIndex="0"
            >
                <img
                    src={logo}
                    alt="Logo TankSaver"
                    style={{
                        width: '200px',
                        height: 'auto',
                    }}
                />
            </Box>
            </ChakraProvider>
    );
}

export default Rodape;
