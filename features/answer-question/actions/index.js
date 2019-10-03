import { makeActionCreator } from '../../../utils/helpers/redux';

const SEND_ANSWER_REQUEST = 'answerQuestion/SEND_ANSWER_REQUEST';
const SEND_ANSWER_SUCCESS = 'answerQuestion/SEND_ANSWER_SUCCESS';
const CLEAR_STATE = 'answerQuestion/CLEAR_STATE';

export const sendAnswerRequest = makeActionCreator(SEND_ANSWER_REQUEST, 'request');
export const sendAnswerResponse = makeActionCreator(SEND_ANSWER_SUCCESS, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  SEND_ANSWER_REQUEST,
  SEND_ANSWER_SUCCESS,
  CLEAR_STATE
};

export const Actions = {
  sendAnswerRequest,
  sendAnswerResponse,
  clearState
};
