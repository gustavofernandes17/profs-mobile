import React, {useState} from 'react';

import {Button, TextInput, Caption, Subheading} from 'react-native-paper';

import styles, {Container, Title, InputGroup} from './styles';

import {NativeStackScreenProps} from '@react-navigation/native-stack'; 
import { useAuth } from '../../contexts/auth.context';




const Login: React.FC<NativeStackScreenProps<{}>> = ({navigation, route}) => {

  const [name, setName] = useState(''); 

  const { handleAuthentication } = useAuth();

  // function that opens a modal to create an account
  function handleEnter() {
    handleAuthentication(name);
  }

  return (
    <Container>
      <InputGroup>
        <Title>Profs</Title>
        <Subheading>feito com ❤ para todas as professoras</Subheading>
      </InputGroup>
      <InputGroup>
        <TextInput
          label="Nome"
          style={styles.inputs}
          mode="outlined"
          placeholder="nos diga seu nome..."
          textContentType="emailAddress"
          onChangeText={(text) => setName(text)}
        />
        <Button mode="contained" style={styles.button} onPress={handleEnter}>
          Entrar
        </Button>
      </InputGroup>

    </Container>
  );
};

export default Login;
