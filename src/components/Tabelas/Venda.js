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

function TabelaVenda() {
    const [dadosVenda, setDadosvenda] = useState([]);

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
                const response = await axios.get(`https://tanksaver-backend.onrender.com/venda/${postoId}/vendasPorPosto/`);
                setDadosvenda(response.data);
            } catch (error) {
                console.error('Erro ao obter dados de venda:', error);
            }
        };
        if (postoId) {
            fetchData();
        }
    }, [postoId]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tanksaver-backend.onrender.com/venda/${id}`);
            const resposta = await axios.get('https://tanksaver-backend.onrender.com/venda/');
            setDadosvenda(resposta.data);
        } catch (error) {
            console.error('Erro ao excluir.', error);
        }
    };

    return (
        <TableContainer alignItems={'center'} w={'70vw'} marginX="auto">
            <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'}>Venda de Combustível</Heading>
            <Table size='sm' bg={'whiteAlpha.700'} borderRadius={'10px'} >
                <Thead >
                    <Tr>
                        <Th fontSize={'sm'} color={'#131328'}>Tipo de combustível</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Tipo de pagamento</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Volume (Litro)</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Valor (Litro)</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Data</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {dadosVenda.map((venda) => (
                        <Tr key={venda.id}>
                            <Td>{venda.tipo_combustivel.tipo_combustivel}</Td>
                            <Td>{venda.tipo_pagamento.tipo_pagamento}</Td>
                            <Td>{venda.volume_venda}</Td>
                            <Td>R$ {venda.preco_litro}</Td>
                            <Td>{venda.data_venda}</Td>

                            <Td textAlign={'right'}>
                                <DeleteIcon
                                    color="red.500"
                                    cursor="pointer"
                                    onClick={() => handleDelete(venda.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default TabelaVenda;
