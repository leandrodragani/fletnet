import { makeActionCreator } from '../../../utils/helpers/redux';

export const MESSAGES_REQUEST = 'messages/MESSAGES_REQUEST';
export const MESSAGES_SUCCESS = 'messages/MESSAGES_SUCCESS';
export const SET_TRANSMITTER = 'messages/SET_TRANSMITTER';
export const START_CHAT_CHANNEL = 'messages/START_CHAT_CHANNEL';

export const messagesRequest = makeActionCreator(MESSAGES_REQUEST, 'request');
export const messagesSuccess = makeActionCreator(MESSAGES_SUCCESS, 'response');
export const setTransmitter = makeActionCreator(SET_TRANSMITTER, 'user');
export const startChatChannel = makeActionCreator(START_CHAT_CHANNEL, 'request');

export const ActionsTypes = {
  MESSAGES_REQUEST,
  MESSAGES_SUCCESS,
  SET_TRANSMITTER,
  START_CHAT_CHANNEL,
};

export const Actions = {
  messagesRequest,
  messagesSuccess,
  setTransmitter,
  startChatChannel,
};
