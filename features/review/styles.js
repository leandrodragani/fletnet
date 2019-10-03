import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ReviewTitleText = styled.Text`
  text-align: left;
  font-size: 40px;
  font-weight: 600;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  color: #454f63;
`;

export const ReviewSubtitleText = styled.Text`
  padding: 18px 12px 12px 12px;
  color: #959dad;
  text-align: justify;
  font-size: 15px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-vertical: 20px;
`;

export const ReviewTextInput = styled.TextInput`
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
