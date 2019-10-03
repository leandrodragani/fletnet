import { Dimensions } from 'react-native';
import styled from 'styled-components';

export const TextInputContainer = styled.View`
  flex: 1;
  top: 25px;
  bottom: 35px;
  align-items: center;
`;

export const TextInput = styled.TextInput`
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
margin-top: 20px;
border-radius: 15px;
margin-horizontal: 15px;
`;
