import styled, { css } from 'styled-components';

export const ButtonTouchable = styled.TouchableOpacity`
  flex-direction: row;
  ${props => props.width !== undefined && css`width: ${props.width}`};
  ${props => props.height !== undefined && css`height: ${props.height}`};
  padding: 12px;
  align-items: center;
  justify-content: center;
  ${props => props.radius && css`
    border-radius: 15px;
  `}
  ${props => (props.color !== undefined ? css`background-color: ${props.color}` : css`background-color: blue`)};
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.24;
  shadow-radius: 7px;
  font-size: 15px;
  elevation: 7;
  ${props => props.absolute && css`
    position: absolute;
  `}
  ${props => props.disabled && css`
    opacity: 0.2;
  `}
`;

export const ButtonText = styled.Text`
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 15px;

  ${props => props.loading && css`
    left: 5px;
  `}
`;
