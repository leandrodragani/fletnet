import { makeActionCreator } from '../../../utils/helpers/redux';

export const USER_RATE_REQUEST = 'rate/USER_RATE_REQUEST';
export const SET_USER_REQUEST = 'rate/SET_USER_REQUEST';
export const USER_RATE_SUCCESS = 'rate/USER_RATE_SUCCESS';
export const SET_USER_SUCCESS = 'rate/SET_USER_SUCCESS';
export const CLEAR_STATE = 'rate/CLEAR_STATE';

export const userRateRequest = makeActionCreator(USER_RATE_REQUEST, 'request');
export const setUser = makeActionCreator(SET_USER_REQUEST, 'request');
export const setUserSuccess = makeActionCreator(SET_USER_SUCCESS, 'response');
export const userRateSuccess = makeActionCreator(USER_RATE_SUCCESS, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, '');

export const ActionsTypes = {
  USER_RATE_REQUEST,
  SET_USER_REQUEST,
  USER_RATE_SUCCESS,
  SET_USER_SUCCESS,
  CLEAR_STATE
};

export const Actions = {
  userRateRequest,
  userRateSuccess,
  setUser,
  setUserSuccess,
  clearState
};
