import { ActionsTypes } from '../actions';

const initialState = {
  isFetching: false
};

export default function signUp(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.USER_SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionsTypes.USER_SIGNUP_RESPONSE:
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
