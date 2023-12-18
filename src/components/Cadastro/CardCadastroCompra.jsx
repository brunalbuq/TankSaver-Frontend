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
    useToast
} from '@chakra-ui/react';
import { format } from 'date-fns';

export function CardCadastroCompra() {
    const [tipo_combustiveis, setCombustiveis] = useState([]);
    const [tipo_combustivel, SetTipo] = useState('');
    const [volume_compra, SetVolume] = useState('');
    const [preco_litro, setValorCompra] = useState(0);
    const [data_compra, SetDataCompra] = useState('');

    const [postoId, setPostoId] = useState('');

    const toast = useToast();

    useEffect(() => {
        const fetchCombustiveis = async () => {
            try {
                const response = await axios.get('https://tanksaver-backend.onrender.com/tipoDeCombustivel/');
                setCombustiveis(response.data);
            } catch (error) {
                console.error('Erro ao obter opções de combustível:', error);
            }
        };

        fetchCombustiveis();
    }, []);

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    const adicionarCompra = async () => {

        try {
            const response = await axios.post('https://tanksaver-backend.onrender.com/compra/', {
                tipo_combustivel,
                volume_compra,
                preco_litro,
                data_compra: format(new Date(data_compra), 'yyyy-MM-dd'),
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
            console.error('Erro ao adicionar compra:', error);
        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
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
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de compra</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>

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

                            <FormLabel>Volume de compra (Litros)</FormLabel>
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
                                    onChange={(e) => setValorCompra(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Data da compra</FormLabel>
                            <Input
                                onChange={(e) => SetDataCompra(e.target.value)}
                                marginBottom={'15px'}
                                variant='filled'
                                placeholder="Select Date"
                                size="md"
                                type="date"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={adicionarCompra} mr={3} bg="#131328" color="white"  _hover={{ bg: '#131328', color: 'white' }}>
                            Salvar
                        </Button>
                        <Button borderColor={isOpen ? '#FFBB0D' : '#131328'}  onClick={onClose} _hover={{ color: '#131328', borderColor: '#FFBB0D' }}borderWidth="2px">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}