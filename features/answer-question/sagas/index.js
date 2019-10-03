import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import {
  getTokenPushNotificationUser,
  sendPushNotification
} from '../../../api/pushNotificationsService';
import { checkValidQuestion } from '../../../api/orderDetailService';
import { updateQuestion } from '../../../api/answerQuestionService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { NOTIFICATION_ORDER_ANSWER } from '../../../utils/constants/notifications';
import { getQuestionsRequest } from '../../order-detail/actions';

function* answerQuestionWorker(action) {
  try {
    const validQuestion = yield call(checkValidQuestion, action.request.answer);
    if (validQuestion) {
      const response = yield call(updateQuestion, action.request);

      if (!response.error) {
        const token = yield call(getTokenPushNotificationUser, action.request.sender);

        const body = {
          to: token,
          title: 'Respondieron a tu pregunta!',
          body: action.request.answer.substring(0, 40),
          data: {
            title: 'Respondieron a tu pregunta!',
            description: action.request.answer.substring(0, 40),
            type: NOTIFICATION_ORDER_ANSWER,
            read: false,
            order_id: action.request.orderID
          }
        };

        yield fork(sendPushNotification, {
          body,
          uid: action.request.sender
        });
        yield put(getQuestionsRequest({ orderId: action.request.orderID }));
        yield put(Actions.sendAnswerResponse());
      } else {
        DropDownHelper.alert(
          'error',
          'Error',
          'Ha ocurrido un error en el sistema. Intente denuevo mas tarde.'
        );
        yield put(Actions.clearState({}));
      }
    } else {
      DropDownHelper.alert('warn', 'Advertencia', 'No permitimos este tipo de respuesta.');
      yield put(Actions.clearState({}));
    }
  } catch (e) {
    console.error(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Intente denuevo mas tarde.'
    );
    yield put(Actions.clearState({}));
  }
}

function* answerQuestionSaga() {
  yield takeEvery(ActionsTypes.SEND_ANSWER_REQUEST, answerQuestionWorker);
}

export default answerQuestionSaga;
