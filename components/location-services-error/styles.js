import styled from 'styled-components';

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-around;
  padding-left: 20px;
  padding-right: 20px;
`;

export const LocationServicesContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LocationServicesImage = styled.Image`
  height: 200px;
  width: 200px;
  resize-mode: contain;
`;

export const LocationServicesText = styled.Text`
  margin-vertical: 5px;
  text-align: center;
  font-size: 16px;
  color: #959DAD;
`;
