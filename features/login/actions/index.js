import { makeActionCreator } from '../../../utils/helpers/redux';

const USER_LOGIN_REQUEST = 'login/USER_LOGIN_REQUEST';
const USER_LOGIN_RESPONSE = 'login/USER_LOGIN_SUCCESS';
const USER_GOOGLE_LOGIN_REQUEST = 'login/USER_GOOGLE_LOGIN_REQUEST';
const CLEAR_STATE = 'login/CLEAR_STATE';

export const userLoginRequest = makeActionCreator(USER_LOGIN_REQUEST, 'request');
export const userLoginResponse = makeActionCreator(USER_LOGIN_RESPONSE, 'response');
export const userGoogleLoginResponse = makeActionCreator(USER_GOOGLE_LOGIN_REQUEST, 'request');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  USER_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_LOGIN_RESPONSE,
  CLEAR_STATE
};

export const Actions = {
  userLoginRequest,
  userLoginResponse,
  userGoogleLoginResponse,
  clearState
};
