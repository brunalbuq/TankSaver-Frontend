import React, { useState } from 'react';
import {
    ChakraProvider,
    Grid,
    theme,
    Heading,
    Divider,
    SimpleGrid,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Rodape from '../components/Rodape/Rodape';
import { CardCadastroCompra } from '../components/Cadastro/CardCadastroCompra';
import { CaixaInfo } from '../components/Informacoes/CaixaInfo';
import { CadastrarVenda } from '../components/Cadastro/CadastrarVenda';
import { AlterarResponsavel } from '../components/Cadastro/AlterarResponsavel';
import { CadastrarTaxas } from '../components/Cadastro/CadastrarTaxas';
import { CadastrarFuncionario } from '../components/Cadastro/CadastrarFuncionario';
import { CadastrarCusto } from '../components/Cadastro/CadastrarCusto';
import { CadastrarTipoPagamento } from '../components/Cadastro/CadastrarTipoPagamento';

function Variaveis() {
    const [reloadPagamentos, setReloadPagamentos] = useState(false);

    const handleTipoPagamentoAdded = () => {
        setReloadPagamentos(true);
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
                <Heading textAlign={'center'} fontWeight={'15px'}>Registros de Dados </Heading>
                <Divider marginTop={'1rem'} marginBottom={'3rem'} />

                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>

                <CaixaInfo title={'Registro de Compras'} info={<CardCadastroCompra/>} />
                <CaixaInfo title={'Registro de Vendas'} info={<CadastrarVenda reloadPagamentos={reloadPagamentos} />} />
                <CaixaInfo title={'Registro de Taxas e Impostos'} info={<CadastrarTaxas/>} />
                <CaixaInfo title={'Registro de Responsável'} info={<AlterarResponsavel/>} />
                <CaixaInfo title={'Registro de Funcionário'} info={<CadastrarFuncionario/>} />
                <CaixaInfo title={'Registro de Custos'} info={<CadastrarCusto />} />
                <CaixaInfo title={'Registro  de Tipos de Pagamento'} info={<CadastrarTipoPagamento onTipoPagamentoAdded={handleTipoPagamentoAdded} />} />
                
                </SimpleGrid>

                <Divider marginTop={'1rem'} marginBottom={'3rem'} />
                <Rodape />

            </Grid>
        </ChakraProvider>
    );
}

export default Variaveis;
