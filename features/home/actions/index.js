import { makeActionCreator } from '../../../utils/helpers/redux';

export const HOME_ORDERS_REQUEST = 'home/HOME_ORDERS_REQUEST';
export const HOME_CARRIERS_REQUEST = 'home/HOME_CARRIERS_REQUEST';
export const ORDERS_SUCCESS = 'home/ORDERS_SUCCESS';
export const CARRIERS_SUCCESS = 'home/CARRIERS_SUCCESS';
export const REQUEST_MORE_ORDERS = 'home/REQUEST_MORE_ORDERS';
export const REQUEST_MORE_CARRIERS = 'home/REQUEST_MORE_CARRIERS';
export const MORE_ORDERS_SUCCESS = 'home/MORE_ORDERS_SUCCESS';
export const MORE_CARRIERS_SUCCESS = 'home/MORE_CARRIERS_SUCCESS';
export const ADD_ORDER = 'home/ADD_ORDER';
export const ADD_CARRIER = 'home/ADD_CARRIER';
export const REMOVE_ORDER = 'home/REMOVE_ORDER';
export const REMOVE_CARRIER = 'home/REMOVE_CARRIER';
export const APPLY_FILTER = 'home/APPLY_FILTER';
export const CLEAR_FILTER = 'home/CLEAR_FILTER';
export const UPDATE_CARRIER_LOCATION = 'home/UPDATE_CARRIER_LOCATION';
export const SET_FETCHING_LOCATION = 'home/SET_FETCHING_LOCATION';

export const homeOrdersRequest = makeActionCreator(HOME_ORDERS_REQUEST, 'request');
export const homeCarriersRequest = makeActionCreator(HOME_CARRIERS_REQUEST, 'request');
export const addOrderToList = makeActionCreator(ADD_ORDER, 'order');
export const addCarrierToList = makeActionCreator(ADD_CARRIER, 'carrier');
export const removeOrderFromList = makeActionCreator(REMOVE_ORDER, 'key');
export const removeCarrierFromList = makeActionCreator(REMOVE_CARRIER, 'key');
export const requestMoreOrders = makeActionCreator(REQUEST_MORE_ORDERS, 'request');
export const requestMoreCarriers = makeActionCreator(REQUEST_MORE_CARRIERS, 'request');
export const ordersSuccess = makeActionCreator(ORDERS_SUCCESS, 'response');
export const carriersSuccess = makeActionCreator(CARRIERS_SUCCESS, 'response');
export const moreOrdersSuccess = makeActionCreator(MORE_ORDERS_SUCCESS, 'response');
export const moreCarriersSuccess = makeActionCreator(MORE_CARRIERS_SUCCESS, 'response');
export const setFetchingLocation = makeActionCreator(SET_FETCHING_LOCATION, 'response');
export const applyFilter = makeActionCreator(APPLY_FILTER, 'filter');
export const clearFilter = makeActionCreator(CLEAR_FILTER, 'filter');
export const updateCarrierLocation = makeActionCreator(UPDATE_CARRIER_LOCATION, 'carrier');

export const ActionsTypes = {
  HOME_ORDERS_REQUEST,
  HOME_CARRIERS_REQUEST,
  ORDERS_SUCCESS,
  CARRIERS_SUCCESS,
  REQUEST_MORE_ORDERS,
  REQUEST_MORE_CARRIERS,
  MORE_ORDERS_SUCCESS,
  MORE_CARRIERS_SUCCESS,
  ADD_ORDER,
  ADD_CARRIER,
  REMOVE_ORDER,
  REMOVE_CARRIER,
  APPLY_FILTER,
  CLEAR_FILTER,
  UPDATE_CARRIER_LOCATION,
  SET_FETCHING_LOCATION
};

export const Actions = {
  homeOrdersRequest,
  homeCarriersRequest,
  addOrderToList,
  addCarrierToList,
  removeOrderFromList,
  removeCarrierFromList,
  requestMoreOrders,
  requestMoreCarriers,
  ordersSuccess,
  carriersSuccess,
  moreOrdersSuccess,
  moreCarriersSuccess,
  applyFilter,
  clearFilter,
  updateCarrierLocation,
  setFetchingLocation
};
