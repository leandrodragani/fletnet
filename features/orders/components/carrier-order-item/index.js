import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_ON_TRIP,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CLOSED,
  ORDER_TRACKING_STATUS_PICKUP
} from '../../../../utils/constants/orders';
import { CardContainer, Title, Subtitle, Body, Timestamp } from './styles';
import { getDatePersonalized } from '../../../../utils/date-utils';
// import { LanguageHelper } from "../../../../utils/helpers/language";

export const CarrierOrderItem = (props) => {
  const { status, id, title, onPress, disabled, createDate } = props;
  return (
    <Animatable.View animation="zoomIn" duration={500} easing="ease-out" style={{ flex: 1 }}>
      <Timestamp>{getDatePersonalized(new Date(createDate))}</Timestamp>
      <CardContainer key={id} onPress={onPress} disabled={disabled}>
        <Body>
          <Title>{title}</Title>
          <Subtitle>
            {(() => {
              let subtitle = '';
              switch (status) {
                case ORDER_STATUS_PENDING:
                  subtitle = 'Pulsá para iniciar el viaje.';
                  break;
                case ORDER_STATUS_ON_TRIP:
                  subtitle = 'En viaje. Pulsá para ver el mapa.';
                  break;
                case ORDER_TRACKING_STATUS_PICKUP:
                  subtitle = 'En busca del pedido. Pulsá para ver el mapa.';
                  break;
                case ORDER_STATUS_DELIVERED:
                  subtitle = 'Pedido entregado! Calificá a tu cliente.';
                  break;
                case ORDER_STATUS_CLOSED:
                  subtitle = 'Cliente calificado! Pedido terminado.';
                  break;
                case ORDER_STATUS_CANCELLED:
                  subtitle = 'El pedido fue cancelado.';
                  break;
                default:
                  subtitle = 'Error al cargar estado del pedido.';
              }

              return subtitle;
            })()}
          </Subtitle>
        </Body>
      </CardContainer>
    </Animatable.View>
  );
};
