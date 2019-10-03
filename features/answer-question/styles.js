import { Dimensions } from 'react-native';
import styled from 'styled-components';

export const TextInput = styled.TextInput`
  width: ${Dimensions.get('window').width - 40};
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
  margin-horizontal: 15px;
  margin-top: 20px;
`;

export const Caption = styled.Text`
  margin-top: 15px;
  color: #959DAD;
  text-align: justify;
  font-size: 12px;
  margin-horizontal: 15px;
`;

export const HeaderTitle = styled.Text`
  text-align: left;
  font-size: 30px;
  font-weight: 600;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  color: #454F63;
`;

export const ButtonContainer2 = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  margin-vertical: 25px;
`;