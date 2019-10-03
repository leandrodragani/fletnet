import styled from 'styled-components';

export const QuestionContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const QuestionTitleText = styled.Text`
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  color: #454F63;
`;

export const QuestionSubtitleText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #78849E;
  padding: 10px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding: 15px;
  align-self: stretch;
`;

export const CloseTouchable = styled.TouchableOpacity`
  right: 8px;
`;

export const QuestionTextInput = styled.TextInput`
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
  margin-horizontal: 20px;
  border-radius: 15px;
`;
