import { makeActionCreator } from '../../../utils/helpers/redux';

const USER_SIGNUP_REQUEST = 'signup/CLIENT_SIGNUP_REQUEST';
const USER_SIGNUP_RESPONSE = 'signup/CLIENT_SIGNUP_RESPONSE';
const CLEAR_STATE = 'signup/CLEAR_STATE';

export const singUpRequest = makeActionCreator(USER_SIGNUP_REQUEST, 'request');
export const signUpResponse = makeActionCreator(USER_SIGNUP_RESPONSE, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_RESPONSE,
  CLEAR_STATE
};

export const Actions = {
  singUpRequest,
  signUpResponse,
  clearState
};
