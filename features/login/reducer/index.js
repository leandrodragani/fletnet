import { ActionsTypes } from '../actions';

const initialState = {
  isFetching: false,
  isFetchingGoogleSelector: false
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionsTypes.USER_GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        isFetchingGoogleSelector: true
      };
    case ActionsTypes.USER_LOGIN_RESPONSE:
      return {
        ...state,
        isFetching: false,
        isFetchingGoogleSelector: false
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
