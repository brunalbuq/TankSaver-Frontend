import React, { useEffect, useState } from 'react';
import {
    ChakraProvider,
    Grid,
    theme,
    Box,
    HStack,
    Flex,
    Heading,
    Divider,
    Spacer,
    Spinner
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Rodape from '../components/Rodape/Rodape';
import { CardPerfil } from '../components/EditarDados/CardPerfil';
import { CaixaInfo2 } from '../components/Informacoes/CaixaInfo2';

import axios from 'axios';

function Perfil() {
    const [postoId, setPostoId] = useState(null);
    const [postoNome, setPostoNome] = useState(null);
    const [postoInfo, setPostoInfo] = useState(null);
    const [responsavelInfo, setResponsavelInfo] = useState(null);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    useEffect(() => {
        const fetchPostoInfo = async () => {
            try {
                const response = await axios.get(`https://tanksaver-backend.onrender.com/posto/${postoId}`);
                setPostoInfo(response.data);
                setLoading(false);

            } catch (error) {
                console.error('Erro ao obter informações do posto:', error);
            }
        };

        const fetchResponsavelInfo = async () => {
            try {
                const response = await axios.get(`https://tanksaver-backend.onrender.com/responsavel/${postoId}/dadosPerfil/`);
                setResponsavelInfo(response.data);
            } catch (error) {
                console.error('Erro ao obter informações do responsavel:', error);
            }
        };



        if (postoId) {
            fetchPostoInfo();
            fetchResponsavelInfo();
        }
    }, [postoId]);

    if (loading) {
        return (
            // Mostrar Spinner enquanto os dados estão sendo carregados
            <Flex
                height="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Spinner
                    thickness="4px"
                    speed="0.70s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Flex>
        );
    }



    return (
        <ChakraProvider theme={theme}>
            <Rodape />

            <Grid
                display={'flex'}
                flexDirection={'column'}
                templateColumns={{ base: '1fr', md: '1fr 2fr' }}
                minHeight="100vh"
                p={{ base: 4, md: 8 }}
                bgColor={'#F5F5F5'}
                zIndex="1"
                marginLeft="13rem"
                overflow="auto"
            >
                <Heading textAlign={'center'} fontWeight={'15px'}>Perfil</Heading>
                <Divider marginTop={'1rem'}></Divider>

                <Flex justifyContent="center" alignItems="center" as="form" marginBottom={8} >
                    <Box p={4} width={{ base: '100%', md: 'auto' }} maxW={{ base: '100%', md: '600px' }}>
                        <Spacer height={4} />
                        <CaixaInfo2 title={'Nome Fantasia'} info={postoInfo?.nome_fantasia} margin={4} />

                        <Spacer height={4} />
                        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4} width="100%" justifyContent="center" marginX="auto">
                            <CaixaInfo2 title={'Bandeira'} info={postoInfo?.bandeira} minH="80px" textAlign="center" customMaxW="250px" />
                            <CaixaInfo2 title={'CNPJ'} info={postoInfo?.cnpj} minH="80px" textAlign="center" customMaxW="250px" />
                            <CaixaInfo2 title={'Telefone Empresarial'} info={postoInfo?.telefone} />
                        </Grid>

                        <Spacer height={4} />

                        <CaixaInfo2 title={'Endereço'} info={postoInfo?.endereco} margin={4} />

                        <Spacer height={4} />

                        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4} width="100%" justifyContent="center" marginX="auto">
                            <CaixaInfo2 title={'CEP'} info={postoInfo?.cep} minH="80px" />
                            <CaixaInfo2 title={'Cidade'} info={postoInfo?.cidade} minH="80px" />
                            <CaixaInfo2 title={'UF'} info={postoInfo?.uf} minH="80px" />
                        </Grid>

                        <Spacer height={4} />

                        <CaixaInfo2 title={'E-mail'} info={postoInfo?.email} mb={4} />

                        <Spacer height={4} />

                        <Grid templateColumns={{ base: '1fr', md: '2fr 2fr' }} gap={4} width="100%" justifyContent="center" marginX="auto">
                            <CaixaInfo2 title={'Responsável pela Empresa'} info={responsavelInfo?.nome} />
                            <CaixaInfo2 title={'Telefone do Responsável'} info={responsavelInfo?.telefone} />
                        </Grid>

                        <Spacer height={7} />
                        <Box marginBox='left'>
                            <CardPerfil />
                        </Box>


                    </Box>
                </Flex>
            </Grid>

            <Sidebar />
        </ChakraProvider>
    );
}

export default Perfil;
