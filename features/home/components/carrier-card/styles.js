import styled, { css } from 'styled-components';

export const CardContainer = styled.TouchableOpacity`
  flex: 1;
  margin-horizontal: 20px;
  margin-bottom: 25px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  border-radius: 12px;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: #454F63;
  margin-bottom: 3px;
`;

export const DistanceText = styled.Text`
  font-size: 12px;
  color: #959DAD;
`;

export const Body = styled.View`
  padding: 15px;
`;

export const OriginLabel = styled.Text`
  margin-top: 15px;
  font-size: 12px;
  color: #959DAD;
`;

export const OriginText = styled.Text`
  font-size: 16px;
  color: #454F63;
  margin-top: 5px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 5px;
`;

export const FooterItemText = styled.Text`
  color: #78849E;
  font-size: 12px;
  font-weight: 600;
  ${props => props.left && css`margin-left: ${props.left}px;`}
`;

export const OrderTypeContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

export const OrderValueContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: row;
`;

export const VehicleTypeContainer = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
`;
