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


function TabelaCompra() {
    const [dadosCompra, setDadosCompra] = useState([]);
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
                const response = await axios.get(`https://tanksaver-backend.onrender.com/compra/${postoId}/comprasPorPosto/`);
                setDadosCompra(response.data);
            } catch (error) {
                console.error('Erro ao obter dados de compra:', error);
            }
        };
        if (postoId) {
            fetchData();
        }
    }, [postoId]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tanksaver-backend.onrender.com/compra/${id}`);
            const resposta = await axios.get(`https://tanksaver-backend.onrender.com/compra/${postoId}/comprasPorPosto/`);
            setDadosCompra(resposta.data);
        } catch (error) {
            console.error('Erro ao excluir.', error);
        }
    };
    return (
        <TableContainer alignItems={'center'} w={'70vw'} marginX="auto">
            <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'}>Compra de Combustível</Heading>
            <Table size='sm' bg={'whiteAlpha.700'} borderRadius={'10px'} >
                <Thead >
                    <Tr>
                        <Th fontSize={'sm'} color={'#131328'}>Tipo de combustível</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Volume (Litro)</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Valor (Litro)</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Data</Th>

                    </Tr>
                </Thead>

                <Tbody>
                    {dadosCompra.map((compra) => (
                        <Tr key={compra.id}>
                            <Td>{compra.tipo_combustivel.tipo_combustivel}</Td>
                            <Td>{compra.volume_compra}</Td>
                            <Td >R$ {compra.preco_litro}</Td>
                            <Td>{compra.data_compra}</Td>

                            <Td textAlign={'right'}>
                                <DeleteIcon
                                    color="red.500"
                                    cursor="pointer"
                                    onClick={() => handleDelete(compra.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>

    );
}

export default TabelaCompra;
