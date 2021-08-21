import React, {useState, useEffect} from 'react';
import { Container, Header, HeaderInput, Content, ContentWrapper} from './styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {Appbar} from 'react-native-paper'; 
import { Alert } from 'react-native';

import getRealm from '../../services/realm'; 
import { useAuth } from '../../contexts/auth.context';

import {
  parseISO, 
  format
} from 'date-fns'; 

import pt from 'date-fns/locale/pt-BR'; 
import { ptBR } from 'date-fns/locale';



export interface RegistryData {
  child_name: string; 
  content: string; 
  title: string; 
  id: string;
  date_created: string; 
  date_updated: string;
} 

type RegistryParams = {
  Registry: {
    child_name: string; 
    content: string; 
    title: string; 
    id: string;
    date_created: string; 
    date_updated: string;
  } 
}




const Registry = () => {
  const routeObj = useRoute();

  const navigation = useNavigation();
  const params = routeObj.params;

  const {currentUser} = useAuth(); 

  const [registryData, setRegistryData] = useState<RegistryData>({} as RegistryData);

  useEffect(() => {
    console.log(params);
    setRegistryData(params);
  }, [])

  const confirmDeleteButton = {
    text: 'Deletar',
    onPress: async () => {
      try {

        const realm = await getRealm(); 

        const registry = realm.objects('Registry').filtered('id == $0', registryData.id)[0]; 

        realm.write(() => {
          realm.delete(registry); 
        });

        navigation.goBack(); 

      } catch(err) {
        Alert.alert('um erro ocorreu', 'houve um erro ao tentar excluir esse registro')
        console.log(err); 
      }

    }, 
  }

  const cancelButton = {
    text: 'Cancelar', 
    onPress: () => {}, 
  }

  function handleDelete() {
    Alert.alert('Aviso', 'tem certeza que deseja deletar esse registro', [confirmDeleteButton, cancelButton])
  }

  
  async function updateCurrentRegistry(data:RegistryData) {

    try {

      const realm = await getRealm(); 

      const registries = realm.objects('Registry').filtered('id == $0', data.id)[0]; 
      console.log(`registries: ${registries}`); 
      realm.write(() => {
        registries.title = data.title; 
        registries.child_name = data.child_name;  
        registries.content = data.content;
        registries.date_updated = data.date_updated; 
      }); 

    } catch (err) {
      Alert.alert('um erro ocorreu', 'enquanto tentavamos fazer a atualização do registro')
      console.log(err); 
    }
  }
  console.log(registryData.date_created); 



  return (
    <Container>
      <Appbar>
        <Appbar.BackAction 
          onPress={() => {
            updateCurrentRegistry({
              ...registryData,
              date_updated: new Date().toISOString(), 
            });
            navigation.goBack()
          }}
        />
        <Appbar.Content 
        title={registryData.title} 
        subtitle={
          format(parseISO(registryData.date_created || new Date().toISOString()), "dd 'de' MMMM 'de' yyyy 'às' HH'h' 'e' mm 'min'", {locale: ptBR})
        } 
        />
        <Appbar.Action icon="delete" onPress={handleDelete}/>
      </Appbar>
      <Header>
        <HeaderInput 
          value={registryData.title}
          onChangeText={(text) =>{
            setRegistryData({...registryData, title: text})
            updateCurrentRegistry({
              ...registryData, 
              date_updated: new Date().toISOString(), 
            });
          }}
          isTitle
          placeholder="digite o título do novo registro..."
          multiline
        />
        <HeaderInput 
          value={registryData.child_name}
          isChildName
          placeholder="nome das crianças envolvidas..."
          onChangeText={(text) => {
            setRegistryData({...registryData, child_name: text})
            updateCurrentRegistry({
              ...registryData, 
              date_updated: new Date().toISOString(), 
            });
          }}
          multiline
        />
        <HeaderInput 
          isDate
          editable={false}
          value={format(parseISO(registryData.date_created || new Date().toISOString()), "dd 'de' MMMM 'de' yyyy 'às' HH'h' 'e' mm 'min'", {locale: ptBR})}
          placeholder="digite a data..."
        />
         <HeaderInput 
          isDate
          editable={false}
          multiline
          value={format(parseISO(registryData.date_updated || new Date().toISOString()), "'última atualização: ' dd 'de' MMMM 'de' yyyy 'às' HH'h' 'e' mm 'min'", {locale: ptBR})}
          placeholder="digite a data..."
        />
      </Header>
      <ContentWrapper>
        <Content 
          value={registryData.content}
          multiline
          numberOfLines={4}
          onChangeText={(text) => {
            setRegistryData({...registryData, content: text})
            updateCurrentRegistry({
              ...registryData, 
      
            });
          }}
          placeholder="comece a digitar seu registro..."
        />
      </ContentWrapper>
    </Container>
  );
}

export default Registry;