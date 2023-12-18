import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ButtonProps = [
    { name: String },
    { link: String }
]

export function BotaoAlerta(props = ButtonProps)  {
    return (
        <Link to={props.link}>
            <Button 
                minW={['10rem', '10rem']}
                maxW={['10rem', '10rem']}
                variant='solid' 
                textColor={'white'} 
                bg={'#131328'} 
                _hover={{ bg: '#24244A', borderColor: '#131328' }} >
                {props.name}
            </Button>
        </Link>
    )

}