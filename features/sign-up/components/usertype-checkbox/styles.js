import styled, { css } from 'styled-components';

export const CheckBoxContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-color: transparent;
  padding: 10px;
`;

export const CheckBoxText = styled.Text`
  ${props => (props.checked ? css`color: white` : css`background-color: #959DAD`)};
  left: 10px;
`;
