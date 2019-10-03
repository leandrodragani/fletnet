import { ActionsTypes } from '../actions';

const initialState = {
  order: {},
  carrier: { vehicle: {} },
  client: {},
  orderTracking: {},
  isFetchingOrderTracking: true,
  isFetchingCarrier: true,
  isFetchingOrder: true,
  isFetchingClient: true,
  carrierLocation: undefined,
  isFetchingCarrierLocation: true,
  trackingStatus: '',
  carrierDistanceMatrix: 0.0
};

export default function orderTrackingReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case ActionsTypes.ORDER_TRACKING_REQUEST:
      return {
        ...state,
        isFetchingOrderTracking: true
      };
    case ActionsTypes.ORDER_TRACKING_SUCCESS:
      return {
        ...state,
        isFetchingOrderTracking: false,
        orderTracking: action.response,
        trackingStatus: action.response.status
      };
    case ActionsTypes.CARRIER_INFO_REQUEST:
      return {
        ...state,
        isFetchingCarrier: true
      };
    case ActionsTypes.ORDER_INFO_REQUEST:
      return {
        ...state,
        isFetchingOrder: true
      };
    case ActionsTypes.ORDER_INFO_SUCCESS:
      return {
        ...state,
        isFetchingOrder: false,
        order: action.response
      };
    case ActionsTypes.CLIENT_INFO_REQUEST:
      return {
        ...state,
        isFetchingClient: true
      };
    case ActionsTypes.CLIENT_INFO_SUCCESS:
      return {
        ...state,
        isFetchingClient: false,
        client: action.response
      };
    case ActionsTypes.CARRIER_INFO_SUCCESS:
      return {
        ...state,
        isFetchingCarrier: false,
        carrier: action.response
      };
    case ActionsTypes.UPDATE_CARRIER_LOCATION:
      return {
        ...state,
        carrierLocation: action.location
      };
    case ActionsTypes.TRACKING_STATUS_CHANGED:
      return {
        ...state,
        trackingStatus: action.status
      };
    case ActionsTypes.UPDATE_CARRIER_DISTANCE_MATRIX:
      return {
        ...state,
        carrierDistanceMatrix: action.matrix
      };
    case ActionsTypes.ORDER_TRACKING_RESET:
      return initialState;
    case 'SignOut':
      return initialState;
    default:
      return state;
  }
}
