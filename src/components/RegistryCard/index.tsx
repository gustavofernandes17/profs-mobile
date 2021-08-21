import React from 'react';
import { Text } from 'react-native';
import { Card, Paragraph, TouchableRipple } from 'react-native-paper';
import {
  parseISO, 
  format
} from 'date-fns'; 

import { ptBR } from 'date-fns/locale';


export interface RegistryCardProps {
  child_name: string; 
  title: string; 
  date_created: string;
  date_updated: string; 
  id: string;
  content: string;
  onPress: () => void;
}

export interface RegistryCardData {
  child_name: string; 
  title: string; 
  date_created: string;
  date_updated: string; 
  id: string;
  content: string;
}


const RegistryCard: React.FC<RegistryCardProps> = 
({child_name, title, date_created, content, date_updated, id, onPress}) => {


  return (
      <Card
        onPress={onPress}
        style={{marginBottom:2}}>
        <Card.Title 
          title={title} 
          subtitle={`${child_name} | ${format(parseISO(date_created), "dd 'de' MMMM 'de' yyyy", {locale: ptBR})}`} 
        />
        <Card.Content>
          <Text numberOfLines={2} >{content}</Text>
        </Card.Content>
      </Card>

  );
}

export default RegistryCard;