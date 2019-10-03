import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { getUser } from '../../../api/orderDetailService';
import {
  getTokenPushNotificationUser,
  sendPushNotification
} from '../../../api/pushNotificationsService';
import { userVoteReputation } from '../../../api/rateService';
import { NOTIFICATION_REPUTATION } from '../../../utils/constants/notifications';

function* rateUserWorker(action) {
  try {
    const data = {
      user_rated_uid: action.request.userRatedUID,
      user_uid: action.request.userUID,
      username: action.request.username,
      message: action.request.message,
      rating: action.request.rating,
      order_uid: action.request.orderUID,
      create_date: Date.now()
    };
    const response = yield call(userVoteReputation, data);

    if (!response.error) {
      const token = yield call(getTokenPushNotificationUser, data.user_rated_uid);

      const body = {
        to: token,
        title: data.username,
        body: 'Lo ha calificado.',
        data: {
          title: `${data.username} Lo ha calificado.`,
          description: `${data.message.substring(0, 20)}...`,
          type: NOTIFICATION_REPUTATION,
          read: false,
          order_id: data.order_uid
        }
      };

      yield fork(sendPushNotification, { body, uid: data.user_rated_uid });
      yield put(Actions.userRateSuccess());
    } else {
      DropDownHelper.alert(
        'error',
        'Error',
        'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
      );
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
  }
}

function* setUserWorker(action) {
  try {
    const user = yield call(getUser, action.request.uid);

    yield put(Actions.setUserSuccess(user));
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
  }
}

function* rateSaga() {
  yield takeEvery(ActionsTypes.USER_RATE_REQUEST, rateUserWorker);
  yield takeEvery(ActionsTypes.SET_USER_REQUEST, setUserWorker);
}

export default rateSaga;
