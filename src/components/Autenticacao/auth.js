/*import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Verifique se o token está presente

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" /> // Redireciona para a página de login se não estiver autenticado
  );
};

export default PrivateRoute;
*/