import styled from 'styled-components';

export const HelpTitleText = styled.Text`
  font-size: 18px;
  color: #454F63;
  font-weight: 600;
  text-align: left;
  padding: 15px 15px 5px 15px;
`;

export const HelpBodyText = styled.Text`
  font-size: 14px;
  color: #78849E;
  text-align: justify;
  padding: 15px;
`;

export const HeaderTitle = styled.Text`
  text-align: left;
  font-size: 40px;
  font-weight: 600;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  color: #454F63;
`;

export const Card = styled.View`
  flex: 1;
  margin-horizontal: 15px;
  margin-bottom: 25px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  border-radius: 15px;
`;
