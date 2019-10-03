import { ActionsTypes } from '../actions';

const initialState = {
  isFetching: false
};

export default function forgotPassword(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.USER_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionsTypes.USER_FORGOT_PASSWORD_RESPONSE:
      return {
        ...state,
        isFetching: false
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
