import React from 'react'
import { NavigationContainer } from '@react-navigation/native'; 

import { useAuth } from '../contexts/auth.context';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes'; 

const Routes: React.FC = () => {

  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export default Routes; 