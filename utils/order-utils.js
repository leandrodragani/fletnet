import {
  ORDER_TRACKING_STATUS_PENDING,
  ORDER_TYPE_EXPRESS,
  ORDER_TYPE_DISTRIBUTION,
  ORDER_TRACKING_STATUS_CLOSE,
  ORDER_TRACKING_STATUS_ON_TRIP,
  ORDER_TRACKING_STATUS_PICKUP
} from './constants/orders';

export function getOrderTypeText(orderType) {
  let response;
  switch (orderType.toLowerCase()) {
    case ORDER_TYPE_EXPRESS:
      response = 'Envío rápido';
      break;
    case ORDER_TYPE_DISTRIBUTION:
      response = 'Reparto';
      break;
    default:
      break;
  }
  return response;
}

export function getClientTrackingStatusText(status) {
  let response;
  switch (status) {
    case ORDER_TRACKING_STATUS_PENDING:
      response = 'Pendiente: Tu transportista todavía no inició el viaje';
      break;
    case ORDER_TRACKING_STATUS_PICKUP:
      response = 'Por cargar: Tu transportista está de camino a buscar tu pedido';
      break;
    case ORDER_TRACKING_STATUS_ON_TRIP:
      response = 'En viaje: Tu transportista tiene tu pedido';
      break;
    case ORDER_TRACKING_STATUS_CLOSE:
      response = 'Entregado: Tu pedido fue realizado';
      break;
    default:
      break;
  }
  return response;
}
