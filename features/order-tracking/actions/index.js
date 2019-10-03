import { makeActionCreator } from '../../../utils/helpers/redux';

export const ORDER_TRACKING_SUCCESS = 'ordertracking/ORDER_TRACKING_SUCCESS';
export const ORDER_TRACKING_REQUEST = 'ordertracking/ORDER_TRACKING_REQUEST';
export const ORDER_TRACKING_RESET = 'ordertracking/ORDER_TRACKING_RESET';
export const CARRIER_INFO_REQUEST = 'ordertracking/CARRIER_INFO_REQUEST';
export const CARRIER_INFO_SUCCESS = 'ordertracking/CARRIER_INFO_SUCCESS';
export const ORDER_INFO_REQUEST = 'ordertracking/ORDER_INFO_REQUEST';
export const ORDER_INFO_SUCCESS = 'ordertracking/ORDER_INFO_SUCCESS';
export const UPDATE_CARRIER_LOCATION = 'ordertracking/UPDATE_CARRIER_LOCATION';
export const WATCH_TRACKING_STATUS = 'ordertracking/WATCH_TRACKING_STATUS';
export const UPDATE_CARRIER_DISTANCE_MATRIX = 'ordertracking/UPDATE_CARRIER_DISTANCE_MATRIX';
export const SET_ORDER_TRACKING_STATUS = 'ordertracking/SET_ORDER_TRACKING_STATUS';
export const SET_ORDER_TRACKING_STATUS_SUCCESS = 'ordertracking/SET_ORDER_TRACKING_STATUS_SUCCESS';
export const CLIENT_INFO_REQUEST = 'ordertracking/CLIENT_INFO_REQUEST';
export const CLIENT_INFO_SUCCESS = 'ordertracking/CLIENT_INFO_SUCCESS';
export const TRACKING_STATUS_CHANGED = 'ordertracking/TRACKING_STATUS_CHANGED';

export const orderTrackingRequest = makeActionCreator(ORDER_TRACKING_REQUEST, 'request');
export const orderTrackingSuccess = makeActionCreator(ORDER_TRACKING_SUCCESS, 'response');
export const orderTrackingReset = makeActionCreator(ORDER_TRACKING_RESET, 'request');
export const carrierInfoRequest = makeActionCreator(CARRIER_INFO_REQUEST, 'request');
export const carrierInfoSuccess = makeActionCreator(CARRIER_INFO_SUCCESS, 'response');
export const orderInfoRequest = makeActionCreator(ORDER_INFO_REQUEST, 'request');
export const orderInfoSuccess = makeActionCreator(ORDER_INFO_SUCCESS, 'response');
export const updateCarrierLocation = makeActionCreator(UPDATE_CARRIER_LOCATION, 'location');
export const watchTrackingStatus = makeActionCreator(WATCH_TRACKING_STATUS, 'request');
export const updateCarrierDistanceMatrix = makeActionCreator(UPDATE_CARRIER_DISTANCE_MATRIX, 'matrix');
export const setOrderTrackingStatus = makeActionCreator(SET_ORDER_TRACKING_STATUS, 'request');
export const trackingStatusChanged = makeActionCreator(TRACKING_STATUS_CHANGED, 'status');
export const clientInfoRequest = makeActionCreator(CLIENT_INFO_REQUEST, 'request');
export const clientInfoSuccess = makeActionCreator(CLIENT_INFO_SUCCESS, 'response');

export const ActionsTypes = {
  ORDER_TRACKING_SUCCESS,
  ORDER_TRACKING_REQUEST,
  ORDER_TRACKING_RESET,
  CARRIER_INFO_REQUEST,
  CARRIER_INFO_SUCCESS,
  ORDER_INFO_REQUEST,
  ORDER_INFO_SUCCESS,
  UPDATE_CARRIER_LOCATION,
  WATCH_TRACKING_STATUS,
  UPDATE_CARRIER_DISTANCE_MATRIX,
  SET_ORDER_TRACKING_STATUS,
  CLIENT_INFO_REQUEST,
  CLIENT_INFO_SUCCESS,
  TRACKING_STATUS_CHANGED
};

export const Actions = {
  orderTrackingRequest,
  orderTrackingSuccess,
  orderTrackingReset,
  carrierInfoRequest,
  carrierInfoSuccess,
  orderInfoRequest,
  orderInfoSuccess,
  updateCarrierLocation,
  watchTrackingStatus,
  updateCarrierDistanceMatrix,
  setOrderTrackingStatus,
  clientInfoRequest,
  clientInfoSuccess,
  trackingStatusChanged
};
