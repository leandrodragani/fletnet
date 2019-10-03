import { makeActionCreator } from '../../../utils/helpers/redux';

export const CALCULATE_ORDER_SUMMARY_REQUEST = 'addorder/CALCULATE_ORDER_SUMMARY_REQUEST';
export const CALCULATE_ORDER_SUMMARY_SUCCESS = 'addorder/CALCULATE_ORDER_SUMMARY_SUCCESS';
export const SET_TITLE = 'addorder/SET_TITLE';
export const SET_VEHICLE_TYPE = 'addorder/SET_VEHICLE_TYPE';
export const SET_TRIP = 'addorder/SET_TRIP';
export const SET_SPECS = 'addorder/SET_SPECS';
export const CLEAR_STATE = 'addorder/CLEAR_STATE';

export const calculateOrderSummaryRequest = makeActionCreator(CALCULATE_ORDER_SUMMARY_REQUEST, 'request');
export const calculateOrderSummarySuccess = makeActionCreator(CALCULATE_ORDER_SUMMARY_SUCCESS, 'response');
export const setTitle = makeActionCreator(SET_TITLE, 'title');
export const setVehicleType = makeActionCreator(SET_VEHICLE_TYPE, 'vehicleType');
export const setTrip = makeActionCreator(SET_TRIP, 'trip');
export const setSpecs = makeActionCreator(SET_SPECS, 'specs');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  CALCULATE_ORDER_SUMMARY_REQUEST,
  CALCULATE_ORDER_SUMMARY_SUCCESS,
  SET_TITLE,
  SET_VEHICLE_TYPE,
  SET_TRIP,
  SET_SPECS,
  CLEAR_STATE
};

export const Actions = {
  calculateOrderSummaryRequest,
  calculateOrderSummarySuccess,
  setTitle,
  setVehicleType,
  setTrip,
  setSpecs
};
