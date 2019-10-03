import { makeActionCreator } from '../../../utils/helpers/redux';

export const ORDER_DETAIL_REQUEST = 'orderdetail/ORDER_DETAIL_REQUEST';
export const ORDER_DETAIL_SUCCESS = 'orderdetail/ORDER_DETAIL_SUCCESS';
export const ORDER_GET_QUESTIONS_REQUEST = 'orderdetail/ORDER_GET_QUESTIONS_REQUEST';
export const ORDER_GET_QUESTIONS_SUCCESS = 'orderdetail/ORDER_GET_QUESTIONS_SUCCESS';
export const PERFORM_SERVICE_REQUEST = 'orderdetail/PERFORM_SERVICE_REQUEST';
export const PERFORM_SERVICE_SUCCESS = 'orderdetail/PERFORM_SERVICE_SUCCESS';
export const MAKE_QUESTION_REQUEST = 'orderdetail/MAKE_QUESTION_REQUEST';
export const MAKE_QUESTION_SUCCESS = 'orderdetail/MAKE_QUESTION_SUCCESS';
export const CLEAR_STATE = 'orderdetail/CLEAR_STATE';
export const TOGGLE_QUESTION_MODAL = 'orderdetail/TOGGLE_QUESTION_MODAL';

export const orderDetailRequest = makeActionCreator(ORDER_DETAIL_REQUEST, 'request');
export const orderDetailSuccess = makeActionCreator(ORDER_DETAIL_SUCCESS, 'response');
export const getQuestionsRequest = makeActionCreator(ORDER_GET_QUESTIONS_REQUEST, 'request');
export const getQuestionsSuccess = makeActionCreator(ORDER_GET_QUESTIONS_SUCCESS, 'response');
export const performServiceRequest = makeActionCreator(PERFORM_SERVICE_REQUEST, 'request');
export const performServiceSuccess = makeActionCreator(PERFORM_SERVICE_SUCCESS, 'response');
export const makeQuestionRequest = makeActionCreator(MAKE_QUESTION_REQUEST, 'request');
export const makeQuestionSuccess = makeActionCreator(MAKE_QUESTION_SUCCESS, 'response');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');
export const toggleQuestionModal = makeActionCreator(TOGGLE_QUESTION_MODAL, 'response');

export const ActionsTypes = {
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_GET_QUESTIONS_REQUEST,
  ORDER_GET_QUESTIONS_SUCCESS,
  PERFORM_SERVICE_REQUEST,
  PERFORM_SERVICE_SUCCESS,
  MAKE_QUESTION_REQUEST,
  MAKE_QUESTION_SUCCESS,
  CLEAR_STATE,
  TOGGLE_QUESTION_MODAL
};

export const Actions = {
  orderDetailRequest,
  orderDetailSuccess,
  getQuestionsRequest,
  getQuestionsSuccess,
  performServiceRequest,
  performServiceSuccess,
  makeQuestionRequest,
  makeQuestionSuccess,
  clearState,
  toggleQuestionModal
};
