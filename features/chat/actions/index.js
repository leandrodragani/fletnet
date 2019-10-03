import { makeActionCreator } from '../../../utils/helpers/redux';

export const LATEST_MESSAGES_REQUEST = 'chat/LATEST_MESSAGES_REQUEST';
export const LATEST_MESSAGES_SUCCESS = 'chat/LATEST_MESSAGES_SUCCESS';
export const SEND_MESSAGE_REQUEST = 'chat/SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'chat/SEND_MESSAGE_SUCCESS';
export const MORE_MESSAGES_REQUEST = 'chat/MORE_MESSAGES_REQUEST';
export const MORE_MESSAGES_SUCCESS = 'chat/MORE_MESSAGES_SUCCESS';
export const UPDATE_MESSAGES = 'chat/UPDATE_MESSAGES';
export const START_CHAT_CHANNEL = 'chat/START_CHAT_CHANNEL';
export const CLOSE_CHAT_CHANNEL = 'chat/CLOSE_CHAT_CHANNEL';

export const latestMessagesRequest = makeActionCreator(LATEST_MESSAGES_REQUEST, 'request');
export const latestMessagesSuccess = makeActionCreator(LATEST_MESSAGES_SUCCESS, 'response');
export const sendMessageRequest = makeActionCreator(SEND_MESSAGE_REQUEST, 'request');
export const sendMessageSuccess = makeActionCreator(SEND_MESSAGE_SUCCESS, 'response');
export const moreMessagesRequest = makeActionCreator(MORE_MESSAGES_REQUEST, 'request');
export const moreMessagesSuccess = makeActionCreator(MORE_MESSAGES_SUCCESS, 'response');
export const updateMessages = makeActionCreator(UPDATE_MESSAGES, 'messages');
export const startChatChannel = makeActionCreator(START_CHAT_CHANNEL, 'request');
export const closeChatChannel = makeActionCreator(CLOSE_CHAT_CHANNEL, 'response');

export const ActionsTypes = {
  LATEST_MESSAGES_REQUEST,
  LATEST_MESSAGES_SUCCESS,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  MORE_MESSAGES_REQUEST,
  MORE_MESSAGES_SUCCESS,
  UPDATE_MESSAGES,
  START_CHAT_CHANNEL,
  CLOSE_CHAT_CHANNEL
};

export const Actions = {
  latestMessagesRequest,
  latestMessagesSuccess,
  sendMessageRequest,
  sendMessageSuccess,
  moreMessagesRequest,
  moreMessagesSuccess,
  updateMessages,
  startChatChannel,
  closeChatChannel,
};
