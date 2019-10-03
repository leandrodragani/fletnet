import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { GeoFire } from 'geofire';
import { Actions, ActionsTypes } from '../actions';
import {
  ORDER_TRACKING_STATUS_CLOSE,
  ORDER_TRACKING_STATUS_PICKUP,
  ORDER_TRACKING_STATUS_ON_TRIP,
  ORDER_TRACKING_STATUS_PENDING,
  ORDER_TRACKING_STATUS_CANCELLED
} from '../../../utils/constants/orders';
import { CARRIER_USER_TYPE } from '../../../utils/constants/users';
import {
  getUser,
  getOrder,
  getOrderTrackingRef,
  getUserOrderTracking,
  getLocationCarrierRef,
  setOrderTrackingStat
} from '../../../api/orderDetailService';
import {
  sendPushNotification,
  getTokenPushNotificationUser
} from '../../../api/pushNotificationsService';
import { store } from '../../../redux/store';
import { NOTIFICATION_ORDER_TRACKING } from '../../../utils/constants/notifications';

function* orderTrackingRequestWorker(action) {
  const { orderId, usertype } = action.request;

  const orderTracking = yield call(getUserOrderTracking, orderId);

  yield put(Actions.carrierInfoRequest(orderTracking.carrier_uid));
  yield put(Actions.orderInfoRequest(orderId));
  yield put(Actions.orderTrackingSuccess({ orderId, ...orderTracking }));
  yield put(Actions.watchTrackingStatus({ orderId }));

  if (usertype === CARRIER_USER_TYPE) {
    yield put(Actions.clientInfoRequest(orderTracking.client_uid));
  }
}

function* carrierInfoRequestWorker(action) {
  const carrier = yield call(getUser, action.request);
  yield put(Actions.carrierInfoSuccess(carrier));
}

function* orderInfoRequestWorker(action) {
  const order = yield call(getOrder, action.request);
  yield put(Actions.orderInfoSuccess(order));
}

function* clientInfoRequestWorker(action) {
  const client = yield call(getUser, action.request);
  yield put(Actions.clientInfoSuccess(client));
}

function getLocationCarrierWatcher(buffer, query) {
  return eventChannel((emit) => {
    query.on('child_changed', () => {
      query.once('value', (snapshot2) => {
        const marker = {
          latitude: snapshot2.val().l[0],
          longitude: snapshot2.val().l[1]
        };
        emit(Actions.updateCarrierLocation(marker));
      });
    });

    query.once('value', (snapshot) => {
      const marker = {
        latitude: snapshot.val().l[0],
        longitude: snapshot.val().l[1]
      };
      emit(Actions.updateCarrierLocation(marker));
    });

    return () => {
      query.off();
    };
  }, buffer);
}

function* getLocationCarrierOrderWorker(action) {
  let channel;
  try {
    const buffer = buffers.expanding();

    const query = yield call(getLocationCarrierRef, action.response.carrier_uid);
    channel = yield call(getLocationCarrierWatcher, buffer, query);

    yield fork(clearEventChannelWorker, channel);

    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (channel != undefined) {
      channel.close();
    }
  }
}

function trackingStatusWatcher(buffer, query) {
  return eventChannel((emit) => {
    query.on('child_changed', () => {
      query.once('value', (snapshot2) => {
        emit(Actions.trackingStatusChanged(snapshot2.val().status));
      });
    });

    query.once('value', (snapshot) => {
      emit(Actions.trackingStatusChanged(snapshot.val().status));
    });

    return () => {
      query.off();
    };
  }, buffer);
}

function* trackingStatusWorker(action) {
  let channel;
  try {
    const buffer = buffers.expanding();
    const query = yield call(getOrderTrackingRef, action.request.orderId);

    channel = yield call(trackingStatusWatcher, buffer, query);

    yield fork(clearEventChannelWorker, channel);

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

function* clearEventChannelWorker(channel) {
  yield take('SignOut');
  if (channel != undefined) {
    channel.close();
  }
}

function* updateCarrierDistanceMatrixWorker(action) {
  const { order } = store.getState().orderTrackingReducer;
  const { carrier } = store.getState().orderTrackingReducer;
  const status = store.getState().orderTrackingReducer.trackingStatus;
  const states = [
    ORDER_TRACKING_STATUS_PENDING,
    ORDER_TRACKING_STATUS_CANCELLED,
    ORDER_TRACKING_STATUS_CLOSE
  ];

  if (order != {} && states.indexOf(status) === -1) {
    const origin = [action.location.latitude, action.location.longitude];
    let destination = {};

    switch (status) {
      case ORDER_TRACKING_STATUS_PICKUP:
      case ORDER_TRACKING_STATUS_PENDING:
        destination = [order.origin.coordinates.latitude, order.origin.coordinates.longitude];
        break;
      case ORDER_TRACKING_STATUS_ON_TRIP:
        if (order.destination === undefined) {
          order.destination = order.waypoints[order.waypoints.length - 1];
        }
        destination = [
          order.destination.coordinates.latitude,
          order.destination.coordinates.longitude
        ];
        break;
      default:
        break;
    }
    const distance = GeoFire.distance(origin, destination);

    if (action.status === ORDER_TRACKING_STATUS_PICKUP) {
      if (distance < 0.05) {
        yield put(
          Actions.setOrderTrackingStatus({
            order,
            status: ORDER_TRACKING_STATUS_ON_TRIP,
            carrier
          })
        );
      }
    }

    yield put(Actions.updateCarrierDistanceMatrix(distance));
  }
}

function* setOrderTrackingStatusWorker(action) {
  const { order, status, carrier, client_uid } = action.request;

  const response = yield call(setOrderTrackingStat, {
    orderId: order.id,
    status,
    client_uid,
    carrier_uid: carrier.uid
  });

  const token = yield call(getTokenPushNotificationUser, order.uid);

  const body = {
    to: token,
    data: {
      type: NOTIFICATION_ORDER_TRACKING,
      read: false,
      order_id: order.id,
      order_title: order.title
    }
  };

  switch (status) {
    case ORDER_TRACKING_STATUS_PICKUP:
      body.title = `${carrier.fullname} está de camino a buscar tu pedido ${order.title.substring(
        0,
        55
      )}...`;
      body.body = `Llegará en ${55} min aprox.`;
      body.data.title = `${
        carrier.fullname
      } está de camino a buscar tu pedido ${order.title.substring(0, 55)}...`;
      body.data.description = `Llegará en ${55} min aprox.`;
      break;
    case ORDER_TRACKING_STATUS_ON_TRIP:
      body.title = `${carrier.fullname} ya tiene tu pedido ${order.title.substring(
        0,
        55
      )}. ¡Seguilo en tiempo real!`;
      body.data.title = `${carrier.fullname} ya tiene tu pedido ${order.title.substring(
        0,
        55
      )}. ¡Seguilo en tiempo real!`;
      break;
    case ORDER_TRACKING_STATUS_CLOSE:
      body.title = `¡${carrier.fullname} ya entregó tu pedido ${order.title.substring(
        0,
        55
      )}!. Calificá el servicio.`;
      body.data.title = `¡${carrier.fullname} ya entregó tu pedido ${order.title.substring(
        0,
        55
      )}!. Calificá el servicio.`;
      break;
    default:
      break;
  }

  yield fork(sendPushNotification, { body, uid: order.uid });
}

function* orderTrackingSaga() {
  yield takeEvery(ActionsTypes.ORDER_TRACKING_REQUEST, orderTrackingRequestWorker);
  yield takeEvery(ActionsTypes.CARRIER_INFO_REQUEST, carrierInfoRequestWorker);
  yield takeEvery(ActionsTypes.ORDER_INFO_REQUEST, orderInfoRequestWorker);
  yield takeLatest(ActionsTypes.ORDER_TRACKING_SUCCESS, getLocationCarrierOrderWorker);
  yield takeLatest(ActionsTypes.WATCH_TRACKING_STATUS, trackingStatusWorker);
  yield takeEvery(ActionsTypes.UPDATE_CARRIER_LOCATION, updateCarrierDistanceMatrixWorker);
  yield takeEvery(ActionsTypes.SET_ORDER_TRACKING_STATUS, setOrderTrackingStatusWorker);
  yield takeEvery(ActionsTypes.CLIENT_INFO_REQUEST, clientInfoRequestWorker);
}

export default orderTrackingSaga;
