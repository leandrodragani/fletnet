/* eslint-disable no-underscore-dangle */
import { GiftedChat } from 'react-native-gifted-chat';
import { ActionsTypes } from '../actions';

const initialState = {
  transmitter: '',
  isFetching: false,
  isSending: false,
  messages: [],
};

export default function chatReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.LATEST_MESSAGES_REQUEST:
      return {
        ...state,
        isFetching: true,
        transmitter: action.request.transmitter
      };
    case ActionsTypes.LATEST_MESSAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messages: action.response.messages
      };
    case ActionsTypes.UPDATE_MESSAGES: {
      return {
        ...state,
        messages: GiftedChat.append(state.messages, action.messages)
      };
    }
    case ActionsTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isSending: false,
      };
    case ActionsTypes.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        isSending: true,
      };
    default:
      return state;
  }
}
