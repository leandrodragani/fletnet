import { makeActionCreator } from '../../../utils/helpers/redux';

const ORDERS_REQUEST = 'orders/ORDERS_REQUEST';
const ORDERS_SUCCESS = 'orders/ORDERS_SUCCESS';
const ADD_ORDER = 'orders/ADD_ORDER';
const UPDATE_ORDER = 'orders/UPDATE_ORDER';
const DELETE_ORDER = 'orders/DELETE_ORDER';
const FILTER_VIEW_ORDER = 'orders/FILTER_VIEW_ORDER';

const ordersRequest = makeActionCreator(ORDERS_REQUEST, 'request');
const ordersSuccess = makeActionCreator(ORDERS_SUCCESS, 'response');
const addOrder = makeActionCreator(ADD_ORDER, 'order');
const updateOrder = makeActionCreator(UPDATE_ORDER, 'order');
const deleteOrder = makeActionCreator(DELETE_ORDER, 'key');
const filterOrders = makeActionCreator(FILTER_VIEW_ORDER, 'index');

export const ActionsTypes = {
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  FILTER_VIEW_ORDER
};

export const Actions = {
  ordersRequest,
  ordersSuccess,
  addOrder,
  updateOrder,
  deleteOrder,
  filterOrders
};
