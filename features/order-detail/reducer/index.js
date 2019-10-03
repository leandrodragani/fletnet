import { ActionsTypes } from '../actions';

const initialState = {
  isFetching: false,
  order: {},
  client: {},
  questions: [],
  isFetchingQuestions: false,
  isSendingPerformService: false,
  performServiceSuccess: false,
  isSendingQuestion: false,
  lastFetched: '',
  questionVisible: false
};

export default function orderDetailReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.ORDER_DETAIL_REQUEST:
      return {
        ...state,
        isFetching: true,
        lastFetched: action.request.orderId
      };
    case ActionsTypes.ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        order: action.response.order,
        client: action.response.client
      };
    case ActionsTypes.ORDER_GET_QUESTIONS_REQUEST:
      return {
        ...state,
        isFetchingQuestions: true
      };
    case ActionsTypes.ORDER_GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetchingQuestions: false,
        questions: action.response
      };
    case ActionsTypes.PERFORM_SERVICE_REQUEST:
      return {
        ...state,
        isSendingPerformService: true
      };
    case ActionsTypes.PERFORM_SERVICE_SUCCESS:
      return {
        ...state,
        isSendingPerformService: false,
        performServiceSuccess: true
      };
    case ActionsTypes.MAKE_QUESTION_REQUEST:
      return {
        ...state,
        isSendingQuestion: true
      };
    case ActionsTypes.MAKE_QUESTION_SUCCESS:
      return {
        ...state,
        isSendingQuestion: false,
        questionVisible: false
      };
    case ActionsTypes.TOGGLE_QUESTION_MODAL:
      return {
        ...state,
        questionVisible: !state.questionVisible,
        isSendingQuestion: false
      };
    case ActionsTypes.CLEAR_STATE:
      return {
        ...state,
        isFetchingQuestions: false,
        isSendingPerformService: false,
        performServiceSuccess: false,
        isSendingQuestion: false,
        isFetching: false
      };
    default:
      return state;
  }
}
