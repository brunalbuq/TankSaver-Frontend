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
    InputLeftElement,
    InputGroup,
    Tooltip,
    useToast,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

export function CadastrarCusto() {
    const [iptu, setValorIPTU] = useState(0);
    const [custos_operacionais, setValorOperacionais] = useState(0);
    const [honorarios_contabeis, setValorHonorarios] = useState(0);
    const [telefone_internet, setValorTelefone] = useState(0);
    const [luz, setValorLuz] = useState(0);
    const [agua, setValorAgua] = useState(0);
    const [softwares, setValorSoftwares] = useState(0);

    const [postoId, setPostoId] = useState('');

    const toast = useToast();

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

   const adicionarCusto = async () => {

    try {
        const response = await axios.post('https://tanksaver-backend.onrender.com/custos/', {
            iptu,
            custos_operacionais,
            honorarios_contabeis,
            telefone_internet,
            luz,
            agua,
            softwares,
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
        console.error('Erro ao adicionar custos:', error);
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
                        Cadastro de custos
                        <Tooltip label="Os valores a serem inseridos devem ser o total pago por cada custo." fontSize="md" >
                            <QuestionOutlineIcon className="small-icon" style={{ transform: 'scale(0.5)' }} />
                        </Tooltip>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>

                            <FormLabel>Valor do IPTU</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorIPTU(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Valor dos custos operacionais</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorOperacionais(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Valor dos honorários contábeis</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorHonorarios(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Valor da internet e telefone</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorTelefone(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Valor da luz</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorLuz(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Valor da água</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorAgua(e.target.value)} />
                            </InputGroup>

                            <FormLabel>Valor dos softwares utilizados no posto</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children='R$'
                                />
                                <Input
                                    marginBottom={'15px'}
                                    bg={'gray.100'}
                                    onChange={(e) => setValorSoftwares(e.target.value)} />
                            </InputGroup>


                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={adicionarCusto}  mr={3} bg="#131328" color="white" _hover={{ bg: '#131328', color: 'white' }}>
                            Salvar
                        </Button>
                        <Button borderColor={isOpen ? '#FFBB0D' : '#131328'}  onClick={onClose} _hover={{ color: '#131328', borderColor: '#FFBB0D' }}borderWidth="2px">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}