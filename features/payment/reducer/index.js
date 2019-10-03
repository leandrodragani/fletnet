import { ActionsTypes } from '../actions';

const initialState = {
  isPublishing: false,
  isPublishingSuccess: false,
};

export default function paymentReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.ADD_ORDER_REQUEST:
      return {
        ...state,
        isPublishing: true
      };
    case ActionsTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        isPublishing: false,
        isPublishingSuccess: true
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
