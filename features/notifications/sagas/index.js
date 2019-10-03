import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { Actions, ActionsTypes } from '../actions';
import { getNotificationsRef, toggleReadNotification } from '../../../api/pushNotificationsService';
import {
  NOTIFICATION_CHAT_MESSAGE,
  NOTIFICATION_ORDER_TRACKING,
  NOTIFICATION_ORDER_NEAR_RECOMMENDED,
  NOTIFICATION_REPUTATION,
  NOTIFICATION_ORDER_QUESTION,
  NOTIFICATION_ORDER_ANSWER,
  NOTIFICATION_PERFORM_SERVICE,
  NOTIFICATION_RATE
} from '../../../utils/constants/notifications';
import * as NavigationHelper from '../../../utils/helpers/navigation';
import { store } from '../../../redux/store';

function notificationsWatcher(buffer, query) {
  return eventChannel((emit) => {
    query.on('child_added', (snapshot) => {
      const notification = {
        type: snapshot.val().type,
        payload: {
          params: snapshot.val(),
          key: snapshot.key
        }
      };
      console.log(notification);
      emit(Actions.addNotification(notification));
    });

    query.on('child_changed', (snapshot) => {
      const notification = {
        type: snapshot.val().type,
        payload: {
          params: snapshot.val(),
          key: snapshot.key
        }
      };
      emit(Actions.updateNotification(notification));
    });

    query.on('child_removed', (snapshot) => {
      emit(Actions.deleteNotification(snapshot.key));
    });

    query.once('value', () => {
      emit(Actions.notificationsSuccess());
    });

    return () => {
      query.off();
    };
  }, buffer);
}

function* latestNotificationsWorker(action) {
  let channel;
  try {
    const buffer = buffers.expanding();
    const { uid } = action.request;
    const query = yield call(getNotificationsRef, uid);
    channel = yield call(notificationsWatcher, buffer, query);

    yield fork(clearNotificationsSagaWorker, channel);

    while (true) {
      const actionChannel = yield take(channel);
      yield put(actionChannel);
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (channel !== undefined) {
      channel.close();
    }
  }
}

function* toggleReadNotificationWorker(action) {
  const { uid, notificationKey } = action.request;
  yield call(toggleReadNotification, { uid, notificationKey });
}

function* clearNotificationsSagaWorker(channel) {
  yield take('SignOut');
  if (channel !== undefined) {
    channel.close();
  }
}

function* handleChatNotificationWorker(action) {
  NavigationHelper.push('Chat', {
    transmitter: action.payload.params.uid_transmitter,
    receiver: action.payload.params.uid_reciever,
    title: action.payload.params.username_sender
  });
}

function* handleTrackingRequestNotificationWorker(action) {
  NavigationHelper.push('OrderTracking', {
    orderId: action.payload.params.order_id
  });
}

function* handleOrderNearRecommendedNotificationWorker(action) {
  NavigationHelper.push('OrderDetail', { orderID: action.payload.params.order_id });
}

function* handleReputationNotificationWorker() {
  NavigationHelper.push('Reputation', { user: store.getState().globalReducer.user });
}

function* handleOrderQuestionNotificationWorker(action) {
  NavigationHelper.push('OrderDetail', { orderID: action.payload.params.order_id });
}

function* handleOrderAnswerNotificationWorker(action) {
  NavigationHelper.push('OrderDetail', { orderID: action.payload.params.order_id });
}

function* handleOrderRateWorker(action) {
  NavigationHelper.push('Rate', {
    order: action.payload.params.order,
    user: { uid: action.payload.params.user_rated }
  });
}

function* notificationsSaga() {
  yield takeLatest(ActionsTypes.NOTIFICATIONS_REQUEST, latestNotificationsWorker);
  yield takeEvery(ActionsTypes.TOGGLE_READ_NOTIFICATION, toggleReadNotificationWorker);
  yield takeEvery(NOTIFICATION_CHAT_MESSAGE, handleChatNotificationWorker);
  yield takeEvery(NOTIFICATION_ORDER_TRACKING, handleTrackingRequestNotificationWorker);
  yield takeEvery(
    NOTIFICATION_ORDER_NEAR_RECOMMENDED,
    handleOrderNearRecommendedNotificationWorker
  );
  yield takeEvery(NOTIFICATION_REPUTATION, handleReputationNotificationWorker);
  yield takeEvery(NOTIFICATION_PERFORM_SERVICE, handleTrackingRequestNotificationWorker);
  yield takeEvery(NOTIFICATION_ORDER_QUESTION, handleOrderQuestionNotificationWorker);
  yield takeEvery(NOTIFICATION_ORDER_ANSWER, handleOrderAnswerNotificationWorker);
  yield takeEvery(NOTIFICATION_RATE, handleOrderRateWorker);
}

export default notificationsSaga;
