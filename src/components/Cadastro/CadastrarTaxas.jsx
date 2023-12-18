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
    Tooltip,
    Input,
    InputLeftElement,
    InputGroup,
    useToast
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

export function CadastrarTaxas() {
    const [ibran, setValorIBRAN] = useState(0);
    const [ibama, setValorIBAMA] = useState(0);
    const [agefis, setValorAGEFIS] = useState(0);
    const [comissao_bandeira, setValorBandeira] = useState(0);
    const [impostos_recolhidos, setValorImposto] = useState(0);

    const [postoId, setPostoId] = useState('');

    const toast = useToast();

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    const adicionarTaxas = async () => {

        try {
            const response = await axios.post('https://tanksaver-backend.onrender.com/taxas/', {
                ibran,
                ibama,
                agefis,
                comissao_bandeira,
                impostos_recolhidos,
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
            console.error('Erro ao adicionar taxas:', error);
        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    //FILTRO DO MODAL
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
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                    Cadastro de taxas e impostos
                        <Tooltip label="Os valores a serem inseridos devem ser o total pago por cada taxa e imposto." fontSize="md" >
                            <QuestionOutlineIcon className="small-icon" style={{ transform: 'scale(0.5)' }} />
                        </Tooltip>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>

                            <FormLabel>% IBRAN</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='%'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorIBRAN(e.target.value)} />
                            </InputGroup>

                            <FormLabel>% IBAMA</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='%'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorIBAMA(e.target.value)} />
                            </InputGroup>

                            <FormLabel>% AGEFIS</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='%'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorAGEFIS(e.target.value)} />
                            </InputGroup>

                            <FormLabel>% Comissão da Bandeira</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='%'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorBandeira(e.target.value)} />
                            </InputGroup>

                            <FormLabel>% Impostos</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='%'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorImposto(e.target.value)} />
                            </InputGroup>

                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={adicionarTaxas} mr={3} bg="#131328" color="white" _hover={{ bg: '#131328', color: 'white' }}>
                            Salvar
                        </Button>
                        <Button borderColor={isOpen ? '#FFBB0D' : '#131328'}  onClick={onClose} _hover={{ color: '#131328', borderColor: '#FFBB0D' }}borderWidth="2px">Cancelar</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}