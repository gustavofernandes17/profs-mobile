import React from 'react';
import { } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { useAuth } from '../../contexts/auth.context';

import { NativeStackScreenProps } from '@react-navigation/native-stack';


import styles, { Container } from './styles';

import RegistryCard, {RegistryCardData} from '../../components/RegistryCard';



const Registries: React.FC<NativeStackScreenProps<{}>> = (props) => {

  const {handleSignOut} = useAuth(); 

  function handleNavigateToRegistries(data: RegistryCardData ) {
    props.navigation.navigate('Registry', data ); 
  }
  
  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title="Seus Registros"></Appbar.Content>
       
        <Appbar.Action icon="logout" onPress={() => handleSignOut()} />
      </Appbar.Header>
      <RegistryCard 
        child_name="Marvelosa"
        content="lorem ipsum mareavasdlha mareavasdlha ipsumipsumipsumipsum ipsum"
        title="socialização no parque"
        date="20 de agosto de 2021"
        navigation={handleNavigateToRegistries}
      />

      <FAB style={styles.fab} icon="plus" onPress={() => {}} />
    
    </Container>
  );
}

export default Registries;