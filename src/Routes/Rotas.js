import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Perfil from '../Pages/Perfil';
import Login from '../Pages/Login';
import Variaveis from '../Pages/Variaveis';
import Ganhos from '../Pages/Ganhos';
import Custo from '../Pages/Custos';
import Dashboard from '../Pages/Dashboard';
import Dados from '../Pages/InfoBack';

const Private = ({ Item }) => {
  const token = localStorage.getItem('token');
  return token ? <Item /> : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Private Item={Dashboard} />} />
        <Route path="/custos" element={<Private Item={Custo} />} />
        <Route path="/ganhos" element={<Private Item={Ganhos} />} />
        <Route path="/variaveis" element={<Private Item={Variaveis} />} />
        <Route path="/perfil" element={<Private Item={Perfil} />} />
        <Route path="/dados" element={<Private Item={Dados} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;