import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import {
  insertOrder,
  insertOrderDistribution,
  getSomeNearbyCarriers
} from '../../../api/addOrderService';
import {
  getTokenPushNotificationUser,
  sendPushNotification
} from '../../../api/pushNotificationsService';
import { NOTIFICATION_ORDER_NEAR_RECOMMENDED } from '../../../utils/constants/notifications';

function* addOrderdWorker(action) {
  try {
    const order = {
      uid: action.request.uid,
      title: action.request.title,
      origin: action.request.origin,
      destination: action.request.destinations[0],
      assistant: action.request.orderAssistant,
      highlight: false,
      sinceTime: action.request.sinceTime,
      untilTime: action.request.untilTime,
      create_date: Date.now(),
      orderDate: action.request.orderDate,
      withReturn: action.request.withReturn,
      vehicleType: action.request.vehicleType,
      orderValue: action.request.orderSummary.value,
      type: action.request.orderSummary.orderType,
      duration: action.request.orderSummary.duration,
      distance: action.request.orderSummary.distance,
      waypoints: action.request.destinations,
      polyline: action.request.orderSummary.overview_polyline,
      paymentMethod: action.request.paymentMethod
    };

    let response;

    if (order.type === 'express') {
      response = yield call(insertOrder, order);
    } else {
      response = yield call(insertOrderDistribution, order);
    }

    if (!response.error) {
      order.key = response.order_key;
      yield put(Actions.addOrderSuccess(response));
      yield fork(recommendToNearbyCarriers, order);
    } else {
      DropDownHelper.alert(
        'error',
        'Error',
        'Ha ocurrido un error al intentar publicar el pedido.'
      );
    }
  } catch (error) {
    console.log(error);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente más tarde.'
    );
  }
}

function* recommendToNearbyCarriers(order) {
  const geoQuery = yield call(getSomeNearbyCarriers, order);

  let carriers = 0;
  geoQuery.on('key_entered', async (key) => {
    if (carriers < 30) {
      const token = await getTokenPushNotificationUser(key);
      const body = {
        to: token,
        title: `Hay un nuevo pedido cerca tuyo! Podés ganar $${order.orderValue
          .toFixed(2)
          .replace('.', ',')}`,
        body: order.title,
        data: {
          title: `Hay un nuevo pedido cerca tuyo! Podés ganar $${order.orderValue
            .toFixed(2)
            .replace('.', ',')}`,
          description: order.title,
          type: NOTIFICATION_ORDER_NEAR_RECOMMENDED,
          read: false,
          order_id: order.key
        }
      };

      sendPushNotification({ body, uid: key });
    } else {
      geoQuery.cancel();
    }

    carriers += 1;
  });
}

function* paymentSaga() {
  yield takeEvery(ActionsTypes.ADD_ORDER_REQUEST, addOrderdWorker);
}

export default paymentSaga;
