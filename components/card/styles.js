import styled from 'styled-components';

export const CardContainer = styled.View`
  flex: 1;
  margin: 8px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  border-radius: 15px;
`;

export const CardLabel = styled.Text`
  text-align: left;
  font-size: 11px;
  padding: 8px 8px 0px 8px;
  font-weight: 700;
  text-transform: uppercase;
`;
