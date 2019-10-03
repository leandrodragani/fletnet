import styled from 'styled-components';

export const CardContainer = styled.TouchableOpacity`
  flex: 1;
  margin-horizontal: 20px;
  margin-bottom: 10px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  border-radius: 12px;
`;

export const Body = styled.View`
  padding: 15px;
  flex: 1;
`;

export const Title = styled.Text`
  color: #454F63;
  font-size: 18px;
  font-weight: 600;
  padding-horizontal: 5px;
  padding-vertical: 8px;
`;

export const Subtitle = styled.Text`
  color: #78849E;
  font-size: 14px;
  padding-horizontal: 5px;
  padding-bottom: 5px;
`;

export const Timestamp = styled.Text`
  color: #78849E;
  font-size: 12px;
  padding-bottom: 5px;
  margin-horizontal: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
