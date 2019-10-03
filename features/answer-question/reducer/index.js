import { ActionsTypes } from '../actions';

const initialState = {
  success: false,
  isFetching: false
};

export default function answerQuestionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.SEND_ANSWER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionsTypes.SEND_ANSWER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
