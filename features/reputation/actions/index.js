import { makeActionCreator } from '../../../utils/helpers/redux';

const AVERAGE_CALIFICATION_REQUEST = 'reputation/AVERAGE_CALIFICATION_REQUEST';
const AVERAGE_CALIFICATION_RESPONSE = 'reputation/AVERAGE_CALIFICATION_RESPONSE';
const USERS_CALIFICATIONS_REQUEST = 'reputation/USERS_CALIFICATIONS_REQUEST';
const USERS_CALIFICATIONS_RESPONSE = 'reputation/USERS_CALIFICATIONS_RESPONSE';
const CLEAR_STATE = 'reputation/CLEAR_STATE';

export const averageCalificationRequest = makeActionCreator(AVERAGE_CALIFICATION_REQUEST, 'request');
export const averageCalificationResponse = makeActionCreator(AVERAGE_CALIFICATION_RESPONSE, 'response');
export const usersCalificationsRequest = makeActionCreator(USERS_CALIFICATIONS_REQUEST, 'request');
export const usersCalificationsResponse = makeActionCreator(USERS_CALIFICATIONS_RESPONSE, 'response');

export const ActionsTypes = {
  AVERAGE_CALIFICATION_REQUEST,
  AVERAGE_CALIFICATION_RESPONSE,
  USERS_CALIFICATIONS_REQUEST,
  USERS_CALIFICATIONS_RESPONSE,
  CLEAR_STATE
};

export const Actions = {
  averageCalificationRequest,
  averageCalificationResponse,
  usersCalificationsRequest,
  usersCalificationsResponse
};
