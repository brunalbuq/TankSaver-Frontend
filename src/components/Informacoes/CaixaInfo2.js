import React from 'react';
import { Text, Card, CardHeader, CardBody, Box, Flex } from '@chakra-ui/react';

const InfoProps = [
    { title: String },
    { info: String },
    { editor: String }
];

export function CaixaInfo2(props = InfoProps) {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
            <Box align={'center'} bg={'#131328'} textColor={'white'} borderRadius='md' boxShadow={'4px 4px 5px #E4E4E4'} height={'1.7rem'}>
                <Text size='sm'>{props.title}</Text>
            </Box>
            <Box
                borderWidth='1px'
                boxShadow={'2px 2px 5px #E4E4E4'}
                borderColor={'#FFBB0D'}
                align={'center'}
                bg='white'
                height={'1.7rem'}
                borderRadius='md'
                display='flex'
                alignItems='center'
                justifyContent='center'
            >
                <Text fontSize="xs" lineHeight="shorter" margin="0" >
                    {props.info}
                </Text>
            </Box>

        </Box>


    );
}
