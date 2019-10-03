import styled from 'styled-components';

export const GlobalTextInput = styled.TextInput`
  height: 50px;
  background-color: white;
  padding: 5px 0px 5px 8px; 
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  font-size: 14px;
  elevation: 7;
  align-self: stretch;
  margin-top: 4px;
  margin-bottom: 12px;
`;

export const TextInputLabel = styled.Text`
  text-align: left;
  font-size: 11px;
  padding: 4px 4px 0px 4px;
  font-weight: 700;
  text-transform: uppercase;
`;
