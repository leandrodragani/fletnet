import { makeActionCreator } from '../../../utils/helpers/redux';

const SAVE_SIGNATURE_REQUEST = 'signature/SAVE_SIGNATURE_REQUEST';
const SAVE_SIGNATURE_SUCCESS = 'signature/SAVE_SIGNATURE_SUCCESS';
const CLOSE_MODAL_SIGNATURE_SUCCESS = 'signature/CLOSE_MODAL_SIGNATURE_SUCCESS';
const CLEAR_STATE = 'signature/CLEAR_STATE';

export const saveSignatureRequest = makeActionCreator(SAVE_SIGNATURE_REQUEST, 'request');
export const saveSignatureSuccess = makeActionCreator(SAVE_SIGNATURE_SUCCESS, 'response');
export const closeModalSignatureSuccess = makeActionCreator(CLOSE_MODAL_SIGNATURE_SUCCESS, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
    SAVE_SIGNATURE_REQUEST,
    SAVE_SIGNATURE_SUCCESS,
    CLOSE_MODAL_SIGNATURE_SUCCESS,
    CLEAR_STATE
};

export const Actions = {
    saveSignatureRequest,
    saveSignatureSuccess,
    closeModalSignatureSuccess,
    clearState
};
