/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'expo';
import { Divider } from 'react-native-elements';
import {
  TitleText,
  DistanceText,
  OrderTypeContainer,
  OrderValueContainer,
  CardContainer,
  Body,
  OriginLabel,
  OriginText,
  Footer,
  FooterItemText,
  VehicleTypeContainer
} from './styles';
// import { LanguageHelper } from "../../../../utils/helpers/language";

export const CarrierCard = (props) => {
  const { title, onPress, distance, vehicleType, orderType, orderValue, origin, id } = props;
  return (
    <Animatable.View animation="zoomIn" duration={500} easing="ease-out" style={{ flex: 1 }}>
      <CardContainer key={id} onPress={onPress}>
        <Body>
          <TitleText>{title}</TitleText>
          <DistanceText>
            A{' '}
            {distance >= 1
              ? `${distance.toFixed(2)} km`
              : `${Math.trunc(distance * 1000)} m`}{' '}
            de distancia
          </DistanceText>
          <OriginLabel>Cargar en</OriginLabel>
          <OriginText>{origin.description}</OriginText>
          <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 10 }} />
          <Footer>
            <VehicleTypeContainer>
              <Icon.Ionicons name="ios-car" color="#78849E" size={20} />
              <FooterItemText left={5}>{vehicleType}</FooterItemText>
            </VehicleTypeContainer>
            <OrderValueContainer>
              <Icon.Ionicons name="ios-cash" color="#78849E" size={20} />
              <FooterItemText left={5}>$ {orderValue.toFixed(2).toString().replace('.', ',')}</FooterItemText>
            </OrderValueContainer>
            <OrderTypeContainer>
              <FooterItemText>{orderType}</FooterItemText>
            </OrderTypeContainer>
          </Footer>
        </Body>
      </CardContainer>
    </Animatable.View>
  );
};
