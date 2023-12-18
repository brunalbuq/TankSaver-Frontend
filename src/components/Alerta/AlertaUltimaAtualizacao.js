import React from 'react';
import { Alert, AlertIcon, Text, VStack } from '@chakra-ui/react';

const DataProps = [
    {dataHora: String},
    {description: String}
]

export function AlertaUltimaAtualizacao(props = DataProps){
    return (
        <Alert borderRadius={'18px'} bg={'#131328'} status='warning' variant='solid' maxW='35vw'>
            <AlertIcon color={'#FFBB0D'} />
            <VStack>
            <Text>Ultima atualização: {props.dataHora}</Text>
            </VStack>
        </Alert>

    )
}