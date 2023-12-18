import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Rodape from '../components/Rodape/Rodape';
import Chart from 'react-apexcharts';
import moment from 'moment-timezone';
import {
    ChakraProvider,
    Grid,
    theme,
    Heading,
    Divider,
    Button,
    Flex,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
} from '@chakra-ui/react';

function Dashboard() {
    const [postoId, setPostoId] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();


    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: 'basic-line',
                type: 'line',
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        reset: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false
                    },
                    export: {
                        csv: {
                            filename: "RendimentosCSV",
                            columnDelimiter: ',',
                            headerCategory: 'Data',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString();
                            }
                        },
                    },
                },
            },
            stroke: {
                width: 2,
                dashArray: [5, 5]
            },
            xaxis: {
                categories: [],
               
                labels: {
                    
                    formatter: function (val) {
                        let date = moment.tz(val, "YYYY-MM-DD", "America/Sao_Paulo");
                        return date.format('DD/MM/YYYY');
                    },
                    rotate: -45,
                    rotateAlways: true
                }
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        if (val === undefined) {
                            return '';
                        }
                        return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        if (val === undefined) {
                            return '';
                        }
                        return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                    }
                }
            },
            colors: ['#e83b3b', '#00E396', '#FEB019']
        },
        series: [
            {
                name: 'Despesa Mensal',
                data: [],
            },
            {
                name: 'Faturamento Mensal',
                data: [],
            },
            {
                name: 'Total de Rendimento',
                data: [],
            },
        ],
    });

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);
    
    const buscarDadosDoGrafico = () => {
        axios.get(`https://tanksaver-backend.onrender.com/historico/${postoId}/historicoPorPosto/`)
        .then(response => {
            const dataFromApi = response.data;
            
            const categories = dataFromApi.map(item => item.data_historico);
            const despesaMensal = dataFromApi.map(item => parseFloat(item.despesa_mensal));
            const faturamentoMensal = dataFromApi.map(item => parseFloat(item.faturamento_mensal));
            const totalRendimento = dataFromApi.map(item => parseFloat(item.total_rendimento));

            setChartData(prevState => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories,
                    }
                },
                series: [
                    { name: 'Despesa Mensal', data: despesaMensal },
                    { name: 'Faturamento Mensal', data: faturamentoMensal },
                    { name: 'Total de Rendimento', data: totalRendimento }
                ]
            }));
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
    };

    useEffect(() => {
        if (postoId) {
            buscarDadosDoGrafico();
        }
    }, [postoId]);
    

    const enviarFechamentoMes = () => {
        onOpen();
    }

    const confirmarFechamentoMes = () => {
        axios.post(`https://tanksaver-backend.onrender.com/historico/fecharMes/`, {
            posto_id: localStorage.getItem("postoId") 
        })
        .then(response => {
            console.log('Dados enviados com sucesso:', response);
            buscarDadosDoGrafico();
            onClose();
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
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
                <Heading textAlign={'center'} fontWeight={'15px'}>Dashboard</Heading>
                <Divider marginTop={'1rem'} marginBottom={'3rem'} />
                
                

                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={350}
                />
                <Flex justifyContent="flex-end">
                    <Button 
                        size="sm"
                        variant='outline'
                        textColor={'black'}
                        borderColor={'#131328'}
                        _hover={{ bg: '#FFBB0D', textColor: '#131328', borderColor: '#131328' }}
                        onClick={enviarFechamentoMes}>
                            Registrar dados
                    </Button>
                </Flex>

                <Rodape />
            </Grid>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent
                        bg="#131328"
                        color="white"
                        borderColor="#8D7843"
                        borderWidth="1px"
                        borderRadius="8px"
                        
                    >
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Registrar dados
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Tem certeza que deseja registrar os dados do mês no gráfico?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button 
                                color="white"
                                bg="#ff6347"
                                _hover={{ bg: "#e05a4f" }}
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button colorScheme="green" onClick={confirmarFechamentoMes} ml={3}>
                                Confirmar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </ChakraProvider>
    );
}

export default Dashboard;
