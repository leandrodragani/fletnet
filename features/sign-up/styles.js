import { Dimensions } from 'react-native';
import styled from 'styled-components';

export const UsertypeCheckBoxContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const SignUpButtonContainer = styled.View`
  margin-vertical: 25px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: #2A2E43;
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  width: ${Dimensions.get('window').width - 50};
  height: 50;
  border-radius: 15px;
  padding: 4px 0px 4px 8px;
  background-color: #454F63;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.24;
  shadow-radius: 7px;
  font-size: 15px;
  elevation: 7;
  margin-bottom: 20px;
  color: white;
`;

export const LoginNavContainer = styled.View`
  justify-content: flex-end;
  align-self: stretch;
`;
