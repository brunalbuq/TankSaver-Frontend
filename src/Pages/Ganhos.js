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

function Ganhos() {
    const [dadosVenda, setDadosVenda] = useState([]);
    const [loading, setLoading] = useState(true);

    const [postoId, setPostoId] = useState('');

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        
        if (storedPostoId) {        
            setPostoId(storedPostoId);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/venda/${postoId}/vendasPorPosto/`);
                setDadosVenda(resposta.data);
                setLoading(false);
                
            } catch (error) {
                console.error('Erro ao obter dados de venda:', error);
            }
        };

        if (postoId) {
            fetchData();
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

    const ultimaVendaGasolina = dadosVenda.length > 0
        ? dadosVenda.slice().reverse().find((venda) => venda.tipo_combustivel.id === 3)
        : null;

    const ultimaVendaEtanol = dadosVenda.length > 0
        ? dadosVenda.slice().reverse().find((venda) => venda.tipo_combustivel.id === 4)
        : null;

    const ultimaGasolinaA = dadosVenda.length > 0
        ? dadosVenda.slice().reverse().find((venda) => venda.tipo_combustivel.id === 5)
        : null;

    const ultimaVendaDisel = dadosVenda.length > 0
        ? dadosVenda.slice().reverse().find((venda) => venda.tipo_combustivel.id === 6)
        : null;

    const ultimaVendaDiselS = dadosVenda.length > 0
        ? dadosVenda.slice().reverse().find((venda) => venda.tipo_combustivel.id === 7)
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

                <Heading textAlign={'center'} fontWeight={'15px'} >
                    Vendas
                    <Tooltip label="Direcione-se à opção de Registros." fontSize="md" >
                        <QuestionOutlineIcon className="small-icon" style={{ transform: 'scale(0.5)' }} />
                    </Tooltip></Heading>
                <Divider marginTop={'1rem'} />

                <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'} fontWeight={'15px'}>Valor da última venda (Litro)</Heading>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <CaixaInfo title={'Gasolina Comum'} info={ultimaVendaGasolina?.preco_litro ? `R$ ${ultimaVendaGasolina.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Gasolina Aditivada'} info={ultimaGasolinaA?.preco_litro ? `R$ ${ultimaGasolinaA.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Etanol'} info={ultimaVendaEtanol?.preco_litro ? `R$ ${ultimaVendaEtanol.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Disel Comum'} info={ultimaVendaDisel?.preco_litro ? `R$ ${ultimaVendaDisel.preco_litro}` : 'Sem registro'} />
                    <CaixaInfo title={'Disel S10'} info={ultimaVendaDiselS?.preco_litro ? `R$ ${ultimaVendaDiselS.preco_litro}` : 'Sem registro'} />
                </SimpleGrid>

                <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'} fontWeight={'15px'}>Volume da última venda</Heading>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <CaixaInfo title={'Gasolina Comum'} info={ultimaVendaGasolina?.volume_venda != null ? `${ultimaVendaGasolina.volume_venda} Litros` : 'Sem registro'} />
                    <CaixaInfo title={'Gasolina Aditivada'} info={ultimaGasolinaA?.volume_venda != null ? `${ultimaGasolinaA.volume_venda} Litros` : 'Sem registro'} />
                    <CaixaInfo title={'Etanol'} info={ultimaVendaEtanol?.volume_venda != null ? `${ultimaVendaEtanol.volume_venda} Litros` : 'Sem registro'} />
                    <CaixaInfo title={'Disel Comum'} info={ultimaVendaDisel?.volume_venda != null ? `${ultimaVendaDisel.volume_venda} Litros` : 'Sem registro'} />
                    <CaixaInfo title={'Disel S10'} info={ultimaVendaDiselS?.volume_venda != null ? `${ultimaVendaDiselS.volume_venda} Litros` : 'Sem registro'} />
                </SimpleGrid>


                <Divider marginTop={'1rem'} marginBottom={'3rem'} />
                <Rodape />

            </Grid>
        </ChakraProvider>
    );
}

export default Ganhos;
