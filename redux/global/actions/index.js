import { makeActionCreator } from '../../../utils/helpers/redux';

export const SET_USER = 'global/SET_USER';
export const SET_VERIFY_AUTH_LISTENER = 'global/SET_VERIFY_AUTH_LISTENER';
export const SET_CARRIER_LOCATION_CONFIG = 'global/SET_CARRIER_LOCATION_CONFIG';
export const CLEAR_STATE = 'global/CLEAR_STATE';
export const USER_SIGN_OUT_REQUEST = 'global/USER_SIGN_OUT_REQUEST';
export const USER_SIGN_OUT_SUCCESS = 'global/USER_SIGN_OUT_SUCCESS';

export const signOutRequest = makeActionCreator(USER_SIGN_OUT_REQUEST, 'request');
export const signOutSuccess = makeActionCreator(USER_SIGN_OUT_SUCCESS, 'response');
export const setUser = makeActionCreator(SET_USER, 'request');
export const setVerifyAuthListener = makeActionCreator(SET_VERIFY_AUTH_LISTENER, 'request');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');
export const setCarrierLocationConfig = makeActionCreator(SET_CARRIER_LOCATION_CONFIG, 'config');

export const ActionsTypes = {
  SET_USER,
  SET_VERIFY_AUTH_LISTENER,
  SET_CARRIER_LOCATION_CONFIG,
  USER_SIGN_OUT_REQUEST,
  USER_SIGN_OUT_SUCCESS
};

export const Actions = {
  setUser,
  setVerifyAuthListener,
  setCarrierLocationConfig,
  signOutRequest,
  signOutSuccess
};
