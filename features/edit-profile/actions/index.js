import { makeActionCreator } from '../../../utils/helpers/redux';

const EDIT_PROFILE_REQUEST = 'edit-profile/EDIT_PROFILE_REQUEST';
const EDIT_PROFILE_RESPONSE = 'edit-profile/EDIT_PROFILE_RESPONSE';
const CLEAR_STATE = 'edit-profile/CLEAR_STATE';

export const editProfileRequest = makeActionCreator(EDIT_PROFILE_REQUEST, 'request');
export const editProfileSuccess = makeActionCreator(EDIT_PROFILE_RESPONSE, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_RESPONSE,
  CLEAR_STATE
};

export const Actions = {
  editProfileRequest,
  editProfileSuccess,
  clearState
};
