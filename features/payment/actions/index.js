import { makeActionCreator } from '../../../utils/helpers/redux';

export const ADD_ORDER_REQUEST = 'payment/ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'payment/ADD_ORDER_SUCCESS';
export const CLEAR_STATE = 'payment/CLEAR_STATE';

export const addOrderRequest = makeActionCreator(ADD_ORDER_REQUEST, 'request');
export const addOrderSuccess = makeActionCreator(ADD_ORDER_SUCCESS, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    CLEAR_STATE
};

export const Actions = {
    addOrderRequest,
    addOrderSuccess,
    clearState
};
