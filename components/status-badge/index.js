import React from 'react';
import { Badge } from 'react-native-elements';
import { Status } from './styles';
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_ON_TRIP,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CLOSED,
  ORDER_STATUS_ACCEPTED,
  ORDER_TRACKING_STATUS_PICKUP,
  ORDER_TRACKING_STATUS_CLOSE
} from '../../utils/constants/orders';

export const StatusBadge = (props) => {
  const { status } = props;
  return (
    <Badge
      badgeStyle={{
        backgroundColor: (() => {
          let color = '';
          switch (status) {
            case ORDER_STATUS_PENDING:
              color = '#3497FD';
              break;
            case ORDER_STATUS_ACCEPTED:
              color = '#FFB900';
              break;
            case ORDER_STATUS_ON_TRIP:
              color = '#FF9057';
              break;
            case ORDER_TRACKING_STATUS_PICKUP:
              color = '#FF9057';
              break;
            case ORDER_STATUS_DELIVERED:
              color = '#3ACCE1';
              break;
            case ORDER_STATUS_CLOSED:
              color = '#78849E';
              break;
            case ORDER_TRACKING_STATUS_CLOSE:
              color = '#78849E';
              break;
            case ORDER_STATUS_CANCELLED:
              color = '#FF4F9A';
              break;
            default:
              color = 'ERROR';
          }

          return color;
        })(),
        height: 24,
        borderWidth: 0
      }}
      containerStyle={{ padding: 4, alignSelf: 'flex-end' }}
      value={
        <Status>
          {(() => {
            let label = '';
            switch (status) {
              case ORDER_STATUS_PENDING:
                label = 'PENDIENTE';
                break;
              case ORDER_STATUS_ACCEPTED:
                label = 'ACEPTADO';
                break;
              case ORDER_STATUS_ON_TRIP:
                label = 'EN VIAJE';
                break;
              case ORDER_TRACKING_STATUS_PICKUP:
                label = 'EN VIAJE';
                break;
              case ORDER_STATUS_DELIVERED:
                label = 'ENTREGADO';
                break;
              case ORDER_STATUS_CLOSED:
                label = 'CERRADO';
                break;
              case ORDER_TRACKING_STATUS_CLOSE:
                label = 'CERRADO';
                break;
              case ORDER_STATUS_CANCELLED:
                label = 'CANCELADO';
                break;
              default:
                label = 'ERROR';
            }

            return label;
          })()}
        </Status>
      }
    />
  );
};
