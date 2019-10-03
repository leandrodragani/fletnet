import { makeActionCreator } from '../../../utils/helpers/redux';

const ORDER_CANCEL_REQUEST = 'ordercancel/ORDER_CANCEL_REQUEST';
const ORDER_CANCEL_SUCCESS = 'ordercancel/ORDER_CANCEL_SUCCESS';
const CLEAR_STATE = 'ordercancel/CLEAR_STATE';

export const orderCancelRequest = makeActionCreator(ORDER_CANCEL_REQUEST, 'request');
export const orderCancelResponse = makeActionCreator(ORDER_CANCEL_SUCCESS, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  CLEAR_STATE
};

export const Actions = {
  orderCancelRequest,
  orderCancelResponse,
  clearState
};
