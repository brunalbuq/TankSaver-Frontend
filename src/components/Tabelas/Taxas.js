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


function TabelaTaxa() {
    const [dadosTaxa, setDadosTaxa] = useState([]);
    const [postoId, setPostoId] = useState('');

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tanksaver-backend.onrender.com/taxas/${id}`);
            const resposta = await axios.get(`https://tanksaver-backend.onrender.com/taxas/`);
            setDadosTaxa(resposta.data);
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/taxas/${postoId}/taxasPorPosto/`);
                setDadosTaxa(resposta.data);
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
            <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'}>Taxas e Impostos</Heading>
            <Table size='sm' bg={'whiteAlpha.700'} borderRadius={'10px'} >
                <Thead >
                    <Tr>
                        <Th fontSize={'sm'} color={'#131328'}>IBRAN</Th>
                        <Th fontSize={'sm'} color={'#131328'}>IBAMA</Th>
                        <Th fontSize={'sm'} color={'#131328'}>AGEFIS</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Bandeira</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Impostos</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {dadosTaxa.map((taxas) => (
                        <Tr key={taxas.id}>
                            <Td>{taxas.ibran}%</Td>
                            <Td>{taxas.ibama}%</Td>
                            <Td >{taxas.agefis}%</Td>
                            <Td>{taxas.comissao_bandeira}%</Td>
                            <Td>{taxas.impostos_recolhidos}%</Td>

                            <Td textAlign={'right'}>
                                <DeleteIcon
                                    color="red.500"
                                    cursor="pointer"
                                    onClick={() => handleDelete(taxas.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>

    );
}

export default TabelaTaxa;
