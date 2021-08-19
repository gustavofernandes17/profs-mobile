import styled from 'styled-components/native';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputs: {
    width: '90%',
    marginBottom: 18,
  },
  button: {
    width: '90%',
    marginBottom: 18, 
  },
});

export const Container = styled.View`
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 18px; 
`;

export const InputGroup = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export default styles;
