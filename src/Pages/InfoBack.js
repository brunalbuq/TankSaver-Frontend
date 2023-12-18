import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    Grid,
    theme,
    Heading,
    Divider,
    Tooltip,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    TabIndicator,
} from '@chakra-ui/react';

import Sidebar from './Sidebar';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import Rodape from '../components/Rodape/Rodape';
import TabelaFuncionarios from '../components/Tabelas/Funcionarios';
import TabelaResponsavel from '../components/Tabelas/Responsavel';
import TabelaCompra from '../components/Tabelas/Compra';
import TabelaVenda from '../components/Tabelas/Venda';
import TabelaTaxa from '../components/Tabelas/Taxas';
import TabelaCustos from '../components/Tabelas/Custos';

function Dados() {
    const [tabIndex, setTabIndex] = useState(0);
    const [loadedTabs, setLoadedTabs] = useState([0]); // Mantém o controle das guias carregadas
    const [funcionariosLoaded, setFuncionariosLoaded] = useState(true);
    const [responsavelLoaded, setResponsavelLoaded] = useState(false);
    const [compraLoaded, setCompraLoaded] = useState(false);
    const [vendaLoaded, setVendaLoaded] = useState(false);
    const [taxaLoaded, setTaxaLoaded] = useState(false);
    const [custosLoaded, setCustosLoaded] = useState(false);

    const handleTabChange = (index) => {
        setTabIndex(index);

        // Adiciona o índice da guia aos tabs carregados se ainda não foi carregado
        if (!loadedTabs.includes(index)) {
            setLoadedTabs([...loadedTabs, index]);
        }

        // Define a flag de carregamento do componente baseado na guia clicada
        setFuncionariosLoaded(index === 0);
        setResponsavelLoaded(index === 1);
        setCompraLoaded(index === 2);
        setVendaLoaded(index === 3);
        setTaxaLoaded(index === 4);
        setCustosLoaded(index === 5);
    };

    // Atualiza o estado para carregar a tabela de funcionários somente após o componente ser montado
    useEffect(() => {
        setFuncionariosLoaded(true);
    }, []);

    const renderTable = (tableLoaded, tableComponent) => {
        if (tableLoaded) {
            return tableComponent;
        }
        return null;
    };

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
                    Histórico
                    <Tooltip label="Para visualizar os dados de forma dinâmica vá ao dashboard." fontSize="md">
                        <QuestionOutlineIcon className="small-icon" style={{ transform: 'scale(0.5)' }} />
                    </Tooltip>
                </Heading>
                <Divider marginTop={'1rem'} />

                <Tabs size='md' variant='enclosed' index={tabIndex} onChange={handleTabChange}>
                    <TabList>
                        <Tab _selected={{ color: '#FFBB0D', bg: '#131328' }}>Funcionários</Tab>
                        <Tab _selected={{ color: '#FFBB0D', bg: '#131328' }}>Responsável</Tab>
                        <Tab _selected={{ color: '#FFBB0D', bg: '#131328' }}>Compra</Tab>
                        <Tab _selected={{ color: '#FFBB0D', bg: '#131328' }}>Venda</Tab>
                        <Tab _selected={{ color: '#FFBB0D', bg: '#131328' }}>Taxa</Tab>
                        <Tab _selected={{ color: '#FFBB0D', bg: '#131328' }}>Custos</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="#FFBB0D"
                        borderRadius="1px"
                    />

                    <TabPanels>
                        <TabPanel key={0} lazy={!funcionariosLoaded}>
                            {renderTable(funcionariosLoaded, <TabelaFuncionarios />)}
                        </TabPanel>
                        <TabPanel key={1} lazy={!loadedTabs.includes(1)}>
                            {renderTable(responsavelLoaded, <TabelaResponsavel />)}
                        </TabPanel>
                        <TabPanel key={2} lazy={!loadedTabs.includes(2)}>
                            {renderTable(compraLoaded, <TabelaCompra />)}
                        </TabPanel>
                        <TabPanel key={3} lazy={!loadedTabs.includes(3)}>
                            {renderTable(vendaLoaded, <TabelaVenda />)}
                        </TabPanel>
                        <TabPanel key={4} lazy={!loadedTabs.includes(4)}>
                            {renderTable(taxaLoaded, <TabelaTaxa />)}
                        </TabPanel>
                        <TabPanel key={5} lazy={!loadedTabs.includes(5)}>
                            {renderTable(custosLoaded, <TabelaCustos />)}
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Divider marginTop={'1rem'} marginBottom={'3rem'} />
                <Rodape />
            </Grid>
        </ChakraProvider>
    );
}

export default Dados;
