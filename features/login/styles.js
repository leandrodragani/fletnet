import { Dimensions } from 'react-native';
import styled from 'styled-components';

export const LoginButtonContainer = styled.View`
  margin-vertical: 25px;
`;

export const TextInput = styled.TextInput`
  width: ${Dimensions.get('window').width - 50};
  height: 50;
  border-radius: 15px;
  padding: 5px 0px 5px 8px;
  background-color: #FFF;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.24;
  shadow-radius: 7px;
  font-size: 15px;
  elevation: 7;
  color: #454F63;
  margin-bottom: 30px;
`;

export const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
