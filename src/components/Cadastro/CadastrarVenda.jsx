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
    Select,
    Input,
    NumberInputField,
    NumberInput,
    InputLeftElement,
    InputGroup,
    useToast,
} from '@chakra-ui/react';

import { format } from 'date-fns';

export function CadastrarVenda({ reloadPagamentos }) {
    const [tipo_combustiveis, setCombustiveis] = useState([]);
    const [tipo_combustivel, SetTipo] = useState('');
    const [pagamento, setPagamento] = useState([]);
    const [tipo_pagamento, SetTipoPagamento ] = useState ('');
    const [volume_venda, SetVolume] = useState('');
    const [preco_litro, setValorVenda] = useState(0);
    const [data_venda, SetDataVenda] = useState('');

    const [postoId, setPostoId] = useState('');

    const toast = useToast();

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    useEffect(() => {
        const fetchCombustiveis = async () => {
            try {
                const response = await axios.get('https://tanksaver-backend.onrender.com/tipoDeCombustivel/');
                setCombustiveis(response.data);
            } catch (error) {
                console.error('Erro ao obter opções de combustível:', error);
            }
        };

        const fetchPagamentos = async () => {
            try {
                const response = await axios.get(`https://tanksaver-backend.onrender.com/tipoDePagamento/${postoId}/pagamentoPorPosto/`);
                setPagamento(response.data);

                
            } catch (error) {
                console.error('Erro ao obter opções de pagamento:', error);
            }
        };

        fetchCombustiveis();
        fetchPagamentos();
    }, [postoId, reloadPagamentos]);

    

    const adicionarVenda = async () => {

        try {
            const response = await axios.post('https://tanksaver-backend.onrender.com/venda/', {
                tipo_combustivel,
                tipo_pagamento,
                volume_venda,
                preco_litro,
                data_venda: format(new Date(data_venda), 'yyyy-MM-dd'),
                posto: postoId
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
            console.error('Erro ao adicionar venda:', error);
        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    //FILTRO DO MODAL
    const OverlayOne = () => (
        <ModalOverlay
        bg='blackAlpha.300'
        
        />
    )
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

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

                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >Cadastrar</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de venda</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>

                            <FormLabel>Selecione o tipo de pagamento</FormLabel>
                            <Select
                                marginBottom={'15px'}
                                value={tipo_pagamento}
                                variant='filled'
                                placeholder='Selecione'
                                onChange={(e) => SetTipoPagamento(e.target.value)}
                            >
                                {pagamento.map((tipo_pagamento) => (
                                    <option key={tipo_pagamento.id} value={tipo_pagamento.id}>
                                        {tipo_pagamento.tipo_pagamento}
                                    </option>
                                ))}
                            </Select>

                            <FormLabel>Selecione o tipo de combustível</FormLabel>
                            <Select
                                marginBottom={'15px'}
                                value={tipo_combustivel}
                                variant='filled'
                                placeholder='Selecione'
                                onChange={(e) => SetTipo(e.target.value)}
                            >
                                {tipo_combustiveis.map((tipo_combustivel) => (
                                    <option key={tipo_combustivel.id} value={tipo_combustivel.id}>
                                        {tipo_combustivel.tipo_combustivel}
                                    </option>
                                ))}
                            </Select>

                            <FormLabel>Volume de venda (Litros)</FormLabel>
                            <NumberInput
                                marginBottom={'15px'}
                                variant='filled'
                                placeholder='Insira o volume da compra em litros'>
                                <NumberInputField
                                    onChange={(e) => SetVolume(e.target.value)}
                                />
                            </NumberInput>

                            <FormLabel>Valor do litro</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorVenda(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Data da venda</FormLabel>
                            <Input
                                onChange={(e) => SetDataVenda(e.target.value)}
                                marginBottom={'15px'}
                                variant='filled'
                                placeholder="Select Date"
                                size="md"
                                type="date"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={adicionarVenda} mr={3} bg="#131328" color="white" _hover={{ bg: '#131328', color: 'white' }}>
                            Salvar
                        </Button>
                        <Button borderColor={isOpen ? '#FFBB0D' : '#131328'}  onClick={onClose} _hover={{ color: '#131328', borderColor: '#FFBB0D' }}borderWidth="2px">Cancelar</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}