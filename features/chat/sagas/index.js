/* eslint-disable radix */
import { call, put, takeEvery, take, cancel, fork } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { map } from 'lodash';
import {
  getTokenPushNotificationUser,
  sendPushNotification
} from '../../../api/pushNotificationsService';
import {
  getConversationRef,
  sendMessage,
  getConversationId,
  getLatestMessages,
  getMoreMessages,
  existsConversation
} from '../../../api/chatService';
import { Actions, ActionsTypes } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { NOTIFICATION_CHAT_MESSAGE } from '../../../utils/constants/notifications';

function* chatGetLatestMessagesWorker(action) {
  try {
    const check = yield call(existsConversation, action.request);

    if (check) {
      const conversationId = yield call(getConversationId, action.request);

      if (conversationId !== null) {
        const response = yield call(getLatestMessages, conversationId);
        const messages = map(response, (message) => {
          const time = parseInt(message.key);
          return {
            key: message.key,
            text: message.message,
            _id: message.key,
            createdAt: new Date(time),
            user: {
              _id: message.uid
            }
          };
        });

        const { key } = messages[0];
        yield put(Actions.latestMessagesSuccess({ messages: messages.reverse(), lastKey: key }));
      }
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente más tarde.'
    );
  }
}

function* sendMessagesWorker(action) {
  try {
    const { transmitter, receiver, usernameTransmitter, messageSent } = action.request;
    const idConversation = yield call(getConversationId, { transmitter, receiver });
    const message = {
      id: idConversation,
      message: messageSent,
      transmitter,
      receiver,
      time: Date.now()
    };

    const response = yield call(sendMessage, message);
    if (!response.error) {
      const token = yield call(getTokenPushNotificationUser, receiver);

      const body = {
        to: token,
        title: usernameTransmitter,
        body: message.message,
        data: {
          title: `${usernameTransmitter} te ha enviado un mensaje.`,
          description: `${messageSent.substring(0, 20)}...`,
          type: NOTIFICATION_CHAT_MESSAGE,
          read: false,
          uid_transmitter: transmitter,
          uid_receiver: receiver,
          username_transmitter: usernameTransmitter,
          order_id: idConversation
        }
      };

      yield fork(sendPushNotification, { body, uid: receiver });

      yield put(Actions.sendMessageSuccess(idConversation));
    } else {
      console.log(response.error);
      DropDownHelper.alert(
        'error',
        'Error',
        'Ha ocurrido un error al enviar el mensaje, intente más tarde.'
      );
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente más tarde.'
    );
  }
}

function chatWatcher(buffer, query) {
  return eventChannel((emit) => {
    query
      .orderByKey()
      .limitToLast(1)
      .on('child_added', (snapshot) => {
        let messages = [];

        const dat = {
          key: snapshot.key,
          text: snapshot.val().message,
          _id: snapshot.key,
          createdAt: new Date(parseInt(snapshot.key)),
          user: {
            _id: snapshot.val().uid
          }
        };

        messages.push(dat);

        emit(Actions.updateMessages(messages));
      });

    return () => query.off();
  }, buffer);
}

function* chatGetMessagesWorker(action) {
  const task = yield fork(chatGetLatestMessagesWorker, action);

  let channel;

  try {
    const buffer = buffers.expanding();
    const query = yield call(getConversationRef, action.request);

    channel = yield call(chatWatcher, buffer, query);

    while (true) {
      const message = yield take(channel);
      yield put(message);
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente más tarde.'
    );
  } finally {
    if (channel !== undefined) {
      channel.close();
    }
    yield cancel(task);
  }
}

function* startChannelWorker(action) {
  const task = yield fork(chatGetMessagesWorker, action);
  yield take(ActionsTypes.CLOSE_CHAT_CHANNEL);
  yield cancel(task);
}

function* chatSaga() {
  yield takeEvery(ActionsTypes.LATEST_MESSAGES_REQUEST, chatGetLatestMessagesWorker);
  // yield takeEvery(ActionsTypes.CHAT_MORE_MESSAGES_REQUEST, chatGetMoreMessagesWorker);
  yield takeEvery(ActionsTypes.SEND_MESSAGE_REQUEST, sendMessagesWorker);
  yield takeEvery(ActionsTypes.START_CHAT_CHANNEL, startChannelWorker);
}

export default chatSaga;
