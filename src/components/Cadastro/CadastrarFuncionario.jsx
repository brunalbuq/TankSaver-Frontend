import React, { useState, useEffect } from 'react';
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
    InputGroup,
    InputLeftElement,
    useToast
} from '@chakra-ui/react';

axios.defaults.baseURL = "https://tanksaver-backend.onrender.com";

export function CadastrarFuncionario() {
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [totalFolha, setTotalFolha] = useState(0);
    const [postoId, setPostoId] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');

        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    const adicionarFuncionario = async () => {

        try {
            const response = await axios.post('https://tanksaver-backend.onrender.com/funcionario/', {
                nome, cargo, total_folha: totalFolha, posto: postoId
            });

            toast({
                position: 'top',
                title: 'Cadastrado com sucesso',
                status: 'success',
                duration: 3000, 
                isClosable: true,
            });

            onClose();
        } catch (error) {
            console.error('Erro ao adicionar funcionário:', error);
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
                initialFocusRef={null}
                finalFocusRef={null}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de funcionário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>

                            <FormLabel>Nome</FormLabel>
                            <Input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                marginBottom={'15px'}
                                variant='filled' />

                            <FormLabel>Cargo</FormLabel>
                            <Input
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                                marginBottom={'15px'}
                                variant='filled' />

                            <FormLabel>Folha de pagamento</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$' />
                                <Input
                                    bg={'gray.100'}
                                    onChange={(e) => setTotalFolha(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={adicionarFuncionario} mr={3} bg="#131328" color="white"  _hover={{ bg: '#131328', color: 'white' }}>
                            Salvar
                        </Button>
                        <Button borderColor={isOpen ? '#FFBB0D' : '#131328'}  onClick={onClose} _hover={{ color: '#131328', borderColor: '#FFBB0D' }}borderWidth="2px">Cancelar</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
}
