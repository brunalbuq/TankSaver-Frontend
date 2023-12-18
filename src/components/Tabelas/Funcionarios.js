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


function TabelaFuncionarios() {
    const [dadosFuncionarios, setDadosFuncionarios] = useState([]);
    
    const [postoId, setPostoId] = useState('');

    useEffect(() => {
        const storedPostoId = localStorage.getItem('postoId');
        if (storedPostoId) {
            setPostoId(storedPostoId);
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tanksaver-backend.onrender.com/funcionario/${id}`);
            const resposta = await axios.get('https://tanksaver-backend.onrender.com/funcionario/');
            setDadosFuncionarios(resposta.data);
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resposta = await axios.get(`https://tanksaver-backend.onrender.com/funcionario/${postoId}/funcionariosPorPosto/`);
                setDadosFuncionarios(resposta.data);
            } catch (error) {
                console.error('Erro ao obter dados de funcionários:', error);
            }
        };

        if (postoId) {
            fetchData();
        }
    }, [postoId]);




    return (
        <TableContainer alignItems={'center'} w={'70vw'} marginX="auto">
            <Heading size={'md'} marginTop={'3rem'} marginBottom={'0.5rem'}>Funcionários</Heading>
            <Table size='sm' bg={'whiteAlpha.700'} borderRadius={'10px'} >
                <Thead >
                    <Tr>
                        <Th fontSize={'sm'} color={'#131328'}>Nome</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Cargo</Th>
                        <Th fontSize={'sm'} color={'#131328'}>Folha de pagamento</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {dadosFuncionarios.map((funcionario) => (
                        <Tr key={funcionario.id}>
                            <Td>{funcionario.nome}</Td>
                            <Td>{funcionario.cargo}</Td>
                            <Td >R$ {funcionario.total_folha}</Td>
                            <Td textAlign={'right'}>
                                <DeleteIcon
                                    color="red.500"
                                    cursor="pointer"
                                    onClick={() => handleDelete(funcionario.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>

    );
}

export default TabelaFuncionarios;
