import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    FormControl,
    useDisclosure,
    ModalOverlay,
    FormLabel,
    Input,
    InputLeftElement,
    InputGroup,
    useToast,
} from '@chakra-ui/react';

export function CadastrarTipoPagamento({ onTipoPagamentoAdded }) {
    const [tipoPagamento, setTipoPagamento] = useState('');
    const [taxa, setTaxa] = useState('');
    const [postoId, setPostoId] = useState(localStorage.getItem('postoId'));

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const adicionarTipoPagamento = async () => {
        try {
            const response = await axios.post('https://tanksaver-backend.onrender.com/tipoDePagamento/', {
                tipo_pagamento: tipoPagamento,
                taxa,
                posto: postoId
            });

            toast({
                position: 'top',
                title: 'Tipo de pagamento cadastrado com sucesso',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onTipoPagamentoAdded();
            onClose();
        } catch (error) {
            console.error('Erro ao adicionar tipo de pagamento:', error);
            toast({
                position: 'top',
                title: 'Erro ao cadastrar tipo de pagamento',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button
                minW={['10rem', '10rem']}
                maxW={['10rem', '10rem']}
                marginBottom={'15px'}
                variant='outline'
                textColor={'black'}
                borderColor={'#131328'}
                _hover={{ bg: '#FFBB0D', textColor: '#131328', borderColor: '#FFBB0D' }}
                onClick={onOpen}
            >
                Cadastrar
            </Button>

            <Modal
                initialFocusRef={React.useRef(null)}
                finalFocusRef={React.useRef(null)}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Tipo de Pagamento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nome do pagamento</FormLabel>
                            <Input
                                marginBottom={'15px'}
                                bg={'gray.100'}
                                onChange={(e) => setTipoPagamento(e.target.value)}
                            />

                            <FormLabel>% Taxa</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='%'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        if (/^\d*\.?\d*$/.test(valor)) {
                                            setTaxa(valor);
                                        }
                                    }}
                                    value={taxa}
                                />
                            </InputGroup>
                            
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            mr={3}
                            bg="#131328"
                            color="white"
                            _hover={{ bg: '#131328', color: 'white' }}
                            onClick={adicionarTipoPagamento}
                        >
                            Salvar
                        </Button>
                        <Button
                            borderColor={'#131328'}
                            onClick={onClose}
                            _hover={{ color: '#131328', borderColor: '#FFBB0D' }}
                            borderWidth="2px"
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
