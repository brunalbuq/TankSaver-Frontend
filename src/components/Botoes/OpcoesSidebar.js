import React, { useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';

export function OpcoesSidebar(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <VStack alignItems="start" spacing={2} w="100%">
            <Button
                leftIcon={React.cloneElement(props.icon, {
                    color: isHovered ? '#131328' : '#FFBB0D',
                })}
                minW={['9rem', '9rem']}
                maxW={['9rem', '9rem']}
                marginBottom={'15px'}
                variant='outline'
                borderRadius={'8px'}
                color={isHovered ? '#131328' : 'white'}
                borderColor="#8D7843"
                justifyContent="flex-start"
                _hover={{
                    bg: '#FFBB0D',
                    color: '#131328',
                    borderColor: '#131328',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {props.name}
            </Button>
        </VStack>
    );
}
