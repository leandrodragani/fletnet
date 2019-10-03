import { ActionsTypes } from '../actions';

const initialState = {
  isReviewFetching: false,
  isReviewSuccess: false
};

export default function signatureReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.REVIEW_REQUEST:
      return {
        ...state,
        isReviewFetching: true,
        isReviewSuccess: false
      };
    case ActionsTypes.REVIEW_SUCCESS:
      return {
        ...state,
        isReviewFetching: false,
        isReviewSuccess: true
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
