import React, { useState, useEffect } from "react"
import { Box, useDisclosure, HStack } from '@chakra-ui/react'
import { Alert, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import { BotaoAlerta } from "../Botoes/BotaoAlerta";

const ButtonProps = {
  title: String,
  description: String
}

export function AlertaAtualizarDados(props = ButtonProps) {
  const {
    isOpen: isVisible,
    onOpen,
    onClose,
  } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    const timer = setTimeout(() => {
      isVisible || onClose(); 
      isVisible || onOpen(); 
    }, 720000); 

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible]);

  return isVisible ? (
    <Box position={'fixed'} top={0} bottom={0} right={0} left={0} bg={'rgb(0,0,0, 0.7)'} zIndex={'1000'}>
      <Alert
        position={'fixed'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, -50%)'}
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        H='50vh'
        borderRadius={'18px'}
        bg={'#FFBB0D'}
        textColor={'#131328'}
        status='warning'
        variant='solid'
        w='40vw'
        gap='20px'
      >
        <CloseButton alignSelf='flex-end' onClick={onClose} />

        <AlertTitle mt={-25} mb={1} fontSize='lg'>
          {props.title}
        </AlertTitle>

        <AlertDescription maxWidth='sm'>
          {props.description}
        </AlertDescription>

        <HStack>
          <BotaoAlerta link={'/variaveis'} name={'Atualizar dados'} />
        </HStack>
      </Alert>
    </Box>
  ) : null;
}
