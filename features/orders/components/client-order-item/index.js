import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { StatusBadge } from '../../../../components/status-badge';
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_ON_TRIP,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CLOSED,
  ORDER_STATUS_ACCEPTED,
  ORDER_TRACKING_STATUS_PICKUP
} from '../../../../utils/constants/orders';
import { CardContainer, Title, Subtitle, Body, Timestamp } from './styles';
import { getDatePersonalized } from '../../../../utils/date-utils';
// import { LanguageHelper } from "../../../../utils/helpers/language";

export const ClientOrderItem = (props) => {
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
                  subtitle = 'Esperando por un transportista.';
                  break;
                case ORDER_STATUS_ACCEPTED:
                  subtitle = 'Transportista encontrado! Esperando que inicie el viaje.';
                  break;
                case ORDER_STATUS_ON_TRIP:
                  subtitle = 'En viaje. Pulsá para ver el seguimiento.';
                  break;
                case ORDER_TRACKING_STATUS_PICKUP:
                  subtitle = 'En busca del pedido. Pulsa para ver el seguimiento.';
                  break;
                case ORDER_STATUS_DELIVERED:
                  subtitle = 'Pedido entregado! Calificá a tu transportista.';
                  break;
                case ORDER_STATUS_CLOSED:
                  subtitle = 'Transportista calificado! Pedido terminado.';
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
          <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 10 }} />
          <StatusBadge status={status} />
        </Body>
      </CardContainer>
    </Animatable.View>
  );
};
