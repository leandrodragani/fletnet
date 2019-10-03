import { ActionsTypes } from '../actions';

const initialState = {
  isFetching: false,
  success: false
};

export default function orderCancelReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.ORDER_CANCEL_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionsTypes.ORDER_CANCEL_SUCCESS:
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
