import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChakraProvider,
    Grid,
    theme,
    SimpleGrid,
    Flex,
    Heading,
    Divider,
    Tooltip,
    Spinner
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { CaixaInfo } from '../components/Informacoes/CaixaInfo';
import Rodape from '../components/Rodape/Rodape';

axios.defaults.baseURL = "https://tanksaver-backend.onrender.com";

function Custos() {
    const [dadosCompra, setDadosCompra] = useState([]);
    const [dadosCusto, setDadosCusto] = useState([]);
    const [dadosTaxas, setDadosTaxas] = useState([]);
    const [dadosFuncionario, setDadosFuncionario] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postoId, setPostoId] = useState('');

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    useEffect(() => {
        const fetchDataCompra = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/compra/${postoId}/comprasPorPosto/`);
                setDadosCompra(resposta.data);
                setLoading(false);

            } catch (error) {
                console.error('Erro ao obter dados de compra:', error);
            }
        };

        const fetchDataCusto = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/custos/${postoId}/custosPorPosto/`);
                setDadosCusto(resposta.data);
            } catch (error) {
                console.error('Erro ao obter dados de custo:', error);
            }
        };

        const fetchDataTaxa = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/taxas/${postoId}/taxasPorPosto/`);
                setDadosTaxas(resposta.data);
            } catch (error) {
                console.error('Erro ao obter dados de taxas:', error);
            }
        };

        const fetchDataFuncionario = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/funcionario/${postoId}/funcionariosPorPosto/`);
                setDadosFuncionario(resposta.data);
            } catch (error) {
                console.error('Erro ao obter dados de compra:', error);
            }
        };

    if (postoId) {
        fetchDataCompra();
        fetchDataCusto();
        fetchDataTaxa();
        fetchDataFuncionario();
    }
}, [postoId]);


    if (loading) {
        return (
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

    const ultimosCustos = dadosCusto.length > 0
        ? dadosCusto.slice().reverse().find((custo) => custo.iptu)
        : null;

    const ultimasTaxas = dadosTaxas.length > 0
        ? dadosTaxas.slice().reverse().find((taxas) => taxas)
        : null;

    const ultimaCompraGasolina = dadosCompra.length > 0
        ? dadosCompra.slice().reverse().find((compra) => compra.tipo_combustivel.id === 3)
        : null;

    const ultimaCompraEtanol = dadosCompra.length > 0
        ? dadosCompra.slice().reverse().find((compra) => compra.tipo_combustivel.id === 4)
        : null;

    const ultimaGasolinaA = dadosCompra.length > 0
        ? dadosCompra.slice().reverse().find((compra) => compra.tipo_combustivel.id === 5)
        : null;

    const ultimaCompraDisel = dadosCompra.length > 0
        ? dadosCompra.slice().reverse().find((compra) => compra.tipo_combustivel.id === 6)
        : null;

    const ultimaCompraDiselS = dadosCompra.length > 0
        ? dadosCompra.slice().reverse().find((compra) => compra.tipo_combustivel.id === 7)
        : null;


    return (
        <ChakraProvider theme={theme}>
            <Grid
                display={'flex'}
                flexDirection={'column'}
                templateColumns={{ base: '1fr', md: '1fr 2fr' }}
                minHeight="100vh"
                p={8}
                bgColor={'#F5F5F5'}
                zIndex="1"
                marginLeft="13rem"
            >

                <Sidebar />

                <Heading textAlign={'center'} fontWeight={'15px'}>
                    Custos
                    <Tooltip label="Direcione-se à opção de Cadastro." fontSize="md" >
                        <QuestionOutlineIcon className="small-icon" style={{ transform: 'scale(0.5)' }} />
                    </Tooltip>
                </Heading>
                <Divider marginTop={'1rem'} />

                <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'} fontWeight={'15px'}>Valor total da última compra de combustíveis (por litro)</Heading>

                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <CaixaInfo title={'Gasolina Comum'} info={ultimaCompraGasolina?.preco_litro ? `R$ ${ultimaCompraGasolina.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Gasolina Aditivada'} info={ultimaGasolinaA?.preco_litro ? `R$ ${ultimaGasolinaA.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Etanol'} info={ultimaCompraEtanol?.preco_litro ? `R$ ${ultimaCompraEtanol.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Disel Comum'} info={ultimaCompraDisel?.preco_litro ? `R$ ${ultimaCompraDisel.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Disel S10'} info={ultimaCompraDiselS?.preco_litro ? `R$ ${ultimaCompraDiselS.preco_litro}` : 'Sem registro'} />
                </SimpleGrid>

                <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'} fontWeight={'15px'}>Valor dos últimos custos</Heading>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <CaixaInfo title={'IPTU'} info={ultimosCustos?.iptu ? `R$ ${ultimosCustos.iptu}` : 'Sem registro'} />
                    <CaixaInfo title={'Custos Operacionais'} info={ultimosCustos?.custos_operacionais ? `R$ ${ultimosCustos.custos_operacionais}` : 'Sem registro'} />
                    <CaixaInfo title={'Honorários'} info={ultimosCustos?.honorarios_contabeis ? `R$ ${ultimosCustos.honorarios_contabeis}` : 'Sem registro'} />
                    <CaixaInfo title={'Água'} info={ultimosCustos?.agua ? `R$ ${ultimosCustos.agua}` : 'Sem registro'} />
                    <CaixaInfo title={'Luz'} info={ultimosCustos?.luz ? `R$ ${ultimosCustos.luz}` : 'Sem registro'} />
                    <CaixaInfo title={'Telefone e Internet'} info={ultimosCustos?.telefone_internet ? `R$ ${ultimosCustos.telefone_internet}` : 'Sem registro'} />
                    <CaixaInfo title={'Softwares'} info={ultimosCustos?.softwares ? `R$ ${ultimosCustos.softwares}` : 'Sem registro'} />
                </SimpleGrid>

                <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'} fontWeight={'15px'}>Valor das últimas taxas e impostos</Heading>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <CaixaInfo title={'AGEFIS'} info={ultimasTaxas?.agefis ? `% ${ultimasTaxas.agefis}` : 'Sem registro'} />
                    <CaixaInfo title={'IBRAN'} info={ultimasTaxas?.ibran ? `% ${ultimasTaxas.ibran}` : 'Sem registro'} />
                    <CaixaInfo title={'IBAMA'} info={ultimasTaxas?.ibama ? `% ${ultimasTaxas.ibama}` : 'Sem registro'} />
                    <CaixaInfo title={'Bandeira'} info={ultimasTaxas?.comissao_bandeira ? `% ${ultimasTaxas.comissao_bandeira}` : 'Sem registro'} />
                    <CaixaInfo title={'Impostos Recolhidos'} info={ultimasTaxas?.impostos_recolhidos ? `% ${ultimasTaxas.impostos_recolhidos}` : 'Sem registro'} />
                </SimpleGrid>

                <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'} fontWeight={'15px'}>Valor gasto com funcionários</Heading>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {dadosFuncionario.map((funcionario) => (
                        <CaixaInfo
                            key={funcionario.id}
                            title={funcionario.nome}
                            info={funcionario.total_folha ? `R$ ${funcionario.total_folha}` : 'Sem registro'}
                        />
                    ))}
                </SimpleGrid>

                <Divider marginTop={'1rem'} marginBottom={'3rem'} />
                <Rodape />

            </Grid>
        </ChakraProvider>
    );
}

export default Custos;
