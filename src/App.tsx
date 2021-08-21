import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AuthenticationProvider from './contexts/auth.context';
import Routes from './routes';

const App = () => {
  return (
    <AuthenticationProvider>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </AuthenticationProvider> 
  );
};

export default App;