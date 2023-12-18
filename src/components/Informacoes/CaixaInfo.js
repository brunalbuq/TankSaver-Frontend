import React from 'react';
import { Text, Card, CardHeader, CardBody} from '@chakra-ui/react';

const InfoProps = [
    { title: String },
    { info: String },
    { editor: String }
]

export function CaixaInfo(props = InfoProps) {
    return (
        
            <Card size={'sm'} borderWidth={1} height={'8rem'} borderColor="#FFBB0D" borderRadius="10px" boxShadow={'2px 2px 5px #E4E4E4'} >
                <CardHeader align={'center'} bg={'#131328'} textAlign={'center'} textColor={'white'} borderRadius='10px' height={'4rem'}>
                    <Text size='sm' margin={'10px'}>{props.title}</Text>
                </CardHeader>

                <CardBody align={'center'} >
                    {props.info}
                </CardBody>
            </Card>

    )
}