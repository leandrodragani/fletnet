import { makeActionCreator } from '../../../utils/helpers/redux';

const USER_FORGOT_PASSWORD_REQUEST = 'forgot-password/USER_FORGOT_PASSWORD_REQUEST';
const USER_FORGOT_PASSWORD_RESPONSE = 'forgot-password/USER_FORGOT_PASSWORD_RESPONSE';
const CLEAR_STATE = 'forgot-password/CLEAR_STATE';

export const userForgotPasswordRequest = makeActionCreator(USER_FORGOT_PASSWORD_REQUEST, 'request');
export const userForgotPasswordResponse = makeActionCreator(USER_FORGOT_PASSWORD_RESPONSE, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_RESPONSE,
  CLEAR_STATE
};

export const Actions = {
  userForgotPasswordRequest,
  userForgotPasswordResponse,
  clearState
};
