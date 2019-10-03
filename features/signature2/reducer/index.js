import { ActionsTypes } from '../actions';

const initialState = {
  isSignatureSuccess: false,
  isFetching: false
};

export default function signatureReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.SAVE_SIGNATURE_SUCCESS:
      return {
        ...state,
        isSignatureSuccess: true,
        isFetching: false
      }
    case ActionsTypes.SAVE_SIGNATURE_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case ActionsTypes.CLOSE_MODAL_SIGNATURE_SUCCESS:
      return {
        ...state,
        isSignatureSuccess: false
      }
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}