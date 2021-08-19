import React from 'react';
import { View } from 'react-native';
import { Card, Paragraph, TouchableRipple } from 'react-native-paper';

// import { Container } from './styles';

export interface RegistryCardProps {
  child_name: string; 
  title: string; 
  date: string;
  content: string;
  navigation: (data:RegistryCardData ) => void; 
}

export interface RegistryCardData {
  child_name: string; 
  title: string; 
  date: string;
  content: string;
}


const RegistryCard: React.FC<RegistryCardProps> = ({child_name, title, date, content, navigation}) => {
  
  

  return (
  
      <Card onPress={() => navigation({child_name, title, date, content})} style={{marginBottom:2}}>
        <Card.Title title={title} subtitle={`${child_name} | ${date}`}  />
        <Card.Content>
          <Paragraph>{content}</Paragraph>
        </Card.Content>
      </Card>

  );
}

export default RegistryCard;