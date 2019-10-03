import { ActionsTypes } from '../actions';

const initialState = {
  transmitter: '',
  isFetching: false,
  messages: [],
};

export default function messagesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.MESSAGES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionsTypes.MESSAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messages: action.response
      };
    case ActionsTypes.SET_TRANSMITTER:
      return {
        ...state,
        transmitter: action.user
      };
    default:
      return state;
  }
}
