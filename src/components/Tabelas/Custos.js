import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Heading,
    TableContainer,
    Table,
    Th,
    Td,
    Tr,
    Thead,
    Tbody,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';


function TabelaCustos() {
    const [dadosCusto, setDadosCusto] = useState([]);
    const [postoId, setPostoId] = useState('');

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {  
            setPostoId(storedPostoId);
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tanksaver-backend.onrender.com/custos/${id}`);
            const resposta = await axios.get('https://tanksaver-backend.onrender.com/custos/');
            setDadosCusto(resposta.data);
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/custos/${postoId}/custosPorPosto/`);
                setDadosCusto(resposta.data);
            } catch (error) {
                console.error('Erro ao obter dados de responsável:', error);
            }
        };

     if (postoId) {
            fetchData();
        }
    }, [postoId]);


    return (
        <TableContainer alignItems={'center'} w={'70vw'} marginX="auto">
            <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'}>Custos</Heading>
            <Table size='sm' bg={'whiteAlpha.700'} borderRadius={'10px'} >
                <Thead >
                    <Tr>
                        <Th fontSize={'sm'} color={'#131328'}>IPTU</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Custos operacionais</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Honorários</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Telefone e internet</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Luz</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Água</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Softwares</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {dadosCusto.map((custos) => (
                        <Tr key={custos.id}>
                            <Td>R$ {custos.iptu}</Td>
                            <Td>R$ {custos.custos_operacionais}</Td>
                            <Td >R$ {custos.honorarios_contabeis}</Td>
                            <Td>R$ {custos.telefone_internet}</Td>
                            <Td>R$ {custos.luz}</Td>
                            <Td>R$ {custos.agua}</Td>
                            <Td>R$ {custos.softwares}</Td>

                            <Td textAlign={'right'}>
                                <DeleteIcon
                                    color="red.500"
                                    cursor="pointer"
                                    onClick={() => handleDelete(custos.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>

    );
}

export default TabelaCustos;
