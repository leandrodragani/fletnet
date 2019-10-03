import styled from "styled-components";

export const Card = styled.View`
  flex: 1;
  margin-horizontal: 15px;
  margin-vertical: 10px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  border-radius: 15px;
`;

export const Caption = styled.Text`
  color: #959DAD;
  text-align: justify;
  font-size: 12px;
  margin-horizontal: 15px;
  margin-bottom: 5px;
`;

export const OrderPriceContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const OrderPriceText = styled.Text`
  font-size: 40px;
  color: black;
  font-weight: bold;
  text-align: center;
  color: #454F63;
`;

export const OrderPriceSubtitle = styled.Text`
  font-size: 12px;
  color: #959DAD;
  font-weight: normal;
  text-align: center;
  padding: 5px;
`;

export const ButtonContainer = styled.View`
  flex: 0.3;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 10px 20px 10px;
`;

export const WidgetContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;