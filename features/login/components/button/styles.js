import styled, { css } from 'styled-components';

export const LoginButtonTouchable = styled.TouchableOpacity`
  flex-direction: row;
  width: 300px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: #f77915;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.24;
  shadow-radius: 7px;
  font-size: 15px;
  elevation: 7;
`;

export const LoginButtonText = styled.Text`
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  color: white;

  ${props => props.loading && css`
    left: 5px;
  `}
`;
