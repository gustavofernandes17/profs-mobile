import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  align-items: center;

`;

export const Header = styled.View`
  width: 100%; 
  padding: 0 25px; 
`;

export interface HeaderInputProps {
  isChildName?: boolean;
  isTitle?: boolean; 
  isDate?: boolean
}

export const HeaderInput = styled.TextInput<HeaderInputProps>`
  font-size: ${props => props.isTitle ? '26px' : '18px' };
  
  ${props => props.isDate ? 'color: grey; font-size: 16px;' : 'font-weight: bold; ' }


`; 

export const Content = styled.TextInput`
  font-size: 20px;


  padding: 5px; 

`;

export const ContentWrapper = styled.ScrollView`
  flex: 1; 
  width: 95%;
  height: 100%; 
  
`;