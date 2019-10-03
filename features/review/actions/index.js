import { makeActionCreator } from '../../../utils/helpers/redux';

const REVIEW_REQUEST = 'review/REVIEW_REQUEST';
const REVIEW_SUCCESS = 'review/REVIEW_SUCCESS';
const CLEAR_STATE = 'review/CLEAR_STATE';

export const reviewRequest = makeActionCreator(REVIEW_REQUEST, 'request');
export const reviewSuccess = makeActionCreator(REVIEW_SUCCESS, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
    REVIEW_REQUEST,
    REVIEW_SUCCESS,
    CLEAR_STATE
};

export const Actions = {
    reviewRequest,
    reviewSuccess,
    clearState
};
