import React, {useState} from 'react';

import {Button, TextInput, Caption, Subheading, HelperText} from 'react-native-paper';

import styles, {Container, Title, InputGroup} from './styles';

import {NativeStackScreenProps} from '@react-navigation/native-stack'; 
import { useAuth } from '../../contexts/auth.context';
import { Alert, View } from 'react-native';
import { useEffect } from 'react';


const Login: React.FC<NativeStackScreenProps<{}>> = ({navigation, route}) => {

  const [name, setName] = useState(''); 
  const [errorOnInput, setErrorOnInput] = useState(false); 

  const { handleAuthentication, isAuthenticated } = useAuth();

  // function that opens a modal to create an account
  function handleEnter() {
    if (name == '') {
      setErrorOnInput(true);
    } else {
      setErrorOnInput(false); 
      handleAuthentication(name);
    }

  }

  useEffect(() => {
    if (!isAuthenticated) {
      Alert.alert('📔 Bem vinda(o) ao Profs !!', 
      `
      um diário de bordo digital para professoras de educação infantil\n
      essa versão (beta-0.0.1) se trata de um protótipo, portanto alguns bugs são de certa forma
      esperados.\n 
      espero que essa aplicação te ajude a escrever registros da maneira mais eficiente possível.\n 
      `
      )
    }
  }, [])

 

  return (
    <Container>
      <InputGroup>
        <Title>Profs</Title>
      </InputGroup>
      <InputGroup>
      <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          label="Nome"
          style={styles.inputs}
          mode="outlined"
          placeholder="nos diga seu nome..."
          onChangeText={(text) => setName(text)}
          error={errorOnInput}
          
        />
        <HelperText
          visible={errorOnInput}
          type="error"
        >
          Por favor digite um nome válido
        </HelperText>
        </View>
        <Button mode="contained" style={styles.button} onPress={handleEnter}>
          Entrar
        </Button>
      </InputGroup>

    </Container>
  );
};

export default Login;
