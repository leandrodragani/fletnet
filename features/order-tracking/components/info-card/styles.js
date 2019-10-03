import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: #353A50;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  padding: 5px;
  position: absolute;
  bottom: 0px;
  width: ${Dimensions.get('window').width};
  align-self: center;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding-vertical: 50px;
`;

export const LoadingContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  paddingVertical: 50px
`;

export const TitleText = styled.Text`
  font-weight: 600;
  font-size: 30px;
  margin-vertical: 2px;
  color: #FFFFFF;
`;

export const SubtitleText = styled.Text`
  font-size: 14px;
  margin-vertical: 4px;
  color: #78849E
`;

export const BottomContainer = styled.View`
  padding: 20px;
`;

export const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
