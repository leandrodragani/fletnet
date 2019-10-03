import { call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  getOrder,
  getUser,
  getQuestions,
  verifyVehiclePostulation,
  verifyOrderStatus,
  performService,
  insertNewQuestion,
  checkValidQuestion
} from '../../../api/orderDetailService';
import { Actions, ActionsTypes } from '../actions';
import {
  sendPushNotification,
  getTokenPushNotificationUser
} from '../../../api/pushNotificationsService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import {
  NOTIFICATION_ORDER_QUESTION,
  NOTIFICATION_PERFORM_SERVICE
} from '../../../utils/constants/notifications';

function* orderFetchWorker(action) {
  try {
    const order = yield call(getOrder, action.request.orderId);
    const user = yield call(getUser, order.uid);
    yield put(Actions.orderDetailSuccess({ order, user }));
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
  }
}

function* performServiceRequestWorker(action) {
  try {
    const data = {
      value: action.request.value,
      orderID: action.request.orderID,
      carrier: action.request.carrier,
      clientUID: action.request.clientUID,
      orderTitle: action.request.orderTitle,
      timestamp: Date.now()
    };

    if (data.carrier.debtor) {
      DropDownHelper.alert(
        'error',
        'Error',
        'Usted presenta uno o más pagos pendientes. Ante cualquier consulta, envíe un mail a support@dragani.com.ar'
      );
    } else {
      const vehicleTypeRequiredCorrect = yield call(
        verifyVehiclePostulation,
        data.carrier.vehicle.type,
        action.request.vehicleType
      );
      if (vehicleTypeRequiredCorrect) {
        const pending = yield call(verifyOrderStatus, data);
        if (pending) {
          const response = yield call(performService, data);

          if (!response.error) {
            const token = yield call(getTokenPushNotificationUser, data.clientUID);

            const body = {
              to: token,
              title: `${data.carrier.username} será su transportista del pedido ${data.orderTitle}`,
              body: `El precio es de: $ ${parseFloat(data.value)
                .toFixed(2)
                .replace('.', ',')}`,
              data: {
                title: `${data.carrier.username} será su transportista del pedido ${
                  data.orderTitle
                }`,
                description: `El precio es de: $ ${parseFloat(data.value)
                  .toFixed(2)
                  .replace('.', ',')}`,
                type: NOTIFICATION_PERFORM_SERVICE,
                read: false,
                order_id: data.orderID,
                order_title: data.orderTitle
              }
            };

            yield fork(sendPushNotification, { body, uid: data.clientUID });
            yield put(Actions.performServiceSuccess());
          } else {
            console.log(response.error);
            DropDownHelper.alert(
              'error',
              'Error',
              'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
            );
            yield put(Actions.clearState());
          }
        } else {
          DropDownHelper.alert(
            'error',
            'Pedido no disponible',
            'Este pedido fue cancelado o iniciado por otro transportisa.'
          );
          yield put(Actions.clearState());
        }
      } else {
        DropDownHelper.alert(
          'error',
          'Vehículo inválido',
          'Tu vehículo no cumple con lo solicitado en el pedido.'
        );
        yield put(Actions.clearState());
      }
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

function* getQuestionsAnswersWorker(action) {
  try {
    const results = yield call(getQuestions, action.request.orderId);
    yield put(Actions.getQuestionsSuccess(results));
  } catch (error) {
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
  }
}

function* makeQuestionWorker(action) {
  try {
    const data = {
      clientUid: action.request.clientId,
      orderTitle: action.request.orderTitle,
      question: action.request.question,
      orderId: action.request.orderId,
      carrierUid: action.request.carrierId,
      carrierUsername: action.request.carrierUsername
    };

    const validQuestion = yield call(checkValidQuestion, data.question);

    if (validQuestion) {
      const response = yield call(insertNewQuestion, data);

      if (!response.error) {
        const token = yield call(getTokenPushNotificationUser, data.clientUid);

        const body = {
          to: token,
          title: `Recibiste una pregunta por: ${data.orderTitle}`,
          body: data.question.substring(0, 40),
          data: {
            title: `Recibiste una pregunta por: ${data.orderTitle}`,
            description: data.question.substring(0, 40),
            type: NOTIFICATION_ORDER_QUESTION,
            read: false,
            order_id: data.orderId,
            question_id: response.questionId,
            sender: data.carrierUid,
            client_id: data.clientUid
          }
        };

        yield fork(sendPushNotification, { body, uid: data.clientUid });
        yield put(Actions.makeQuestionSuccess());
        yield put(Actions.getQuestionsRequest({ orderId: data.orderId }));
      } else {
        DropDownHelper.alert(
          'error',
          'Error',
          'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
        );
        yield put(Actions.toggleQuestionModal());
      }
    } else {
      DropDownHelper.alert(
        'error',
        'Pregunta inválida',
        'No podés realizar este tipo de preguntas.'
      );
      yield put(Actions.toggleQuestionModal());
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
    yield put(Actions.toggleQuestionModal());
  }
}

function* orderDetailSaga() {
  yield takeEvery(ActionsTypes.ORDER_DETAIL_REQUEST, orderFetchWorker);
  yield takeEvery(ActionsTypes.ORDER_GET_QUESTIONS_REQUEST, getQuestionsAnswersWorker);
  yield takeEvery(ActionsTypes.PERFORM_SERVICE_REQUEST, performServiceRequestWorker);
  yield takeEvery(ActionsTypes.MAKE_QUESTION_REQUEST, makeQuestionWorker);
}

export default orderDetailSaga;
