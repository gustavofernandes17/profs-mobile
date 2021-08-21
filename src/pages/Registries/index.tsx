import React, {useState} from 'react';
import { Appbar, FAB } from 'react-native-paper';
import { useAuth } from '../../contexts/auth.context';

import UUIDGenerator from 'react-native-uuid-generator';

import styles, { Container } from './styles';
import RegistryCard, {RegistryCardData} from '../../components/RegistryCard';
import { useNavigation } from '@react-navigation/native';

import getRealm from '../../services/realm';
import { Alert, FlatList } from 'react-native';
import { useEffect } from 'react';

import Clipboard from '@react-native-clipboard/clipboard'; 


const Registries: React.FC = () => {

  const navigation = useNavigation(); 


  const {handleSignOut, currentUser} = useAuth();
  
  const [registries, setRegistries] = useState<RegistryCardData[]>([]);
  const [copiedText, setCopiedText]= useState('');

  function handleNavigateToRegistry(data: RegistryCardData) {
    console.log(`data before going ${data.id}`); 
    navigation.navigate('Registry', 
    {
      id: data.id, 
      child_name: data.child_name,
      date_created: data.date_created, 
      date_updated: data.date_updated, 
      title: data.title, 
      content: data.content
    }); 
  }

  async function handleCreateRegistry() {

    const uuid = await UUIDGenerator.getRandomUUID(); 

    const data = {
      id: uuid, 
      title: '',
      username: currentUser, 
      content: '', 
      child_name: '', 
      date_created: new Date().toISOString(), 
      date_updated: new Date().toISOString(), 
    }; 

    try {
      const realm = await getRealm();

      realm.write(() => {
        realm.create('Registry', data);
      })

      navigation.navigate('Registry', data); 

    } catch(err) {
      Alert.alert("um erro ocorreu enquanto tentavamos criar um registro"); 
      console.log(err); 
    }
    
  }
  
  useEffect(() => {
    async function loadRegistries() {
      const realm = await getRealm(); 
      
      const data = realm.objects('Registry'); 

      console.log(data); 

      setRegistries(data); 
    }

    loadRegistries(); 
  }, [registries])

  function generateDataForClipBoard(data:RegistryCardData[]) {
    let raw = ''; 
    data.forEach((item) => {
      raw += `Título: ${item.title}\nidentificador do registro: ${item.id}\nCriança(s): ${item.child_name}\nData de criação do Registro: ${item.date_created}\nData de atualização do Registro: ${item.date_updated}\nConteúdo: ${item.content}\n-----`; 
    })

    return raw;
  }

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title="Seus Registros"></Appbar.Content>
       
        <Appbar.Action icon="logout" onPress={() => handleSignOut()} />
        <Appbar.Action icon="file-document" onPress={() => {
          Clipboard.setString(generateDataForClipBoard(registries)); 

        }}/>
      </Appbar.Header>
      <FlatList
        data={registries}
        renderItem={({item}) => (
          <RegistryCard 
            child_name={item.child_name}
            content={item.content}
            date_created={item.date_created}
            date_updated={item.date_updated}
            id={item.id}
            title={item.title}
            key={item.id}
            onPress={() => handleNavigateToRegistry(item)}
          />
        )}
        
      />
      <FAB style={styles.fab} icon="plus" onPress={handleCreateRegistry} />
    
    </Container>
  );
}

export default Registries;