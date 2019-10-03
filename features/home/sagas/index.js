/* eslint-disable require-yield */
import { call, put, takeEvery, takeLatest, take, fork, delay } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { Actions, ActionsTypes } from '../actions';
import { getOrderGeoQuery, indexCarrierLocation } from '../../../api/locationService';
import { getOrder } from '../../../api/orderDetailService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { debounce } from 'lodash';

let geoQuery = null;
let radius = 1 / 2;

function ordersWatcher(buffer) {
  return eventChannel((emit) => {
    let orders = 0;
    geoQuery.on('key_entered', (key, location, distance) => {
      getOrder(key).then((order) => {
        order.distance = distance;
        emit(Actions.addOrderToList(order));
        orders += 1;
      });
    });

    geoQuery.on('key_exited', (key, location, distance) => {
      emit(Actions.removeOrderFromList(key));
    });

    geoQuery.on('ready', () => {
      // if (orders !== 0) {
      //   orders = 0;
      emit(Actions.moreOrdersSuccess(radius));
      // } else if (radius < 30) {
      //   emit(Actions.requestMoreOrders());
      // } else {
      //   emit(Actions.moreOrdersSuccess(radius));
      // }
    });

    return () => geoQuery.cancel();
  }, buffer);
}

function* getNearbyOrdersWorker(action) {
  let channel;

  try {
    const buffer = buffers.sliding(1);
    geoQuery = yield call(getOrderGeoQuery, action.request.location.coords, 50);
    console.log(geoQuery);
    if (geoQuery === false) {
      DropDownHelper.alert(
        'error',
        'Error',
        'Por favor, active su ubicacion para poder ver los pedidos cercanos.'
      );
    } else {
      channel = yield call(ordersWatcher, buffer);
      yield fork(clearHomeSagaWorker, channel);
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    }
  } catch (error) {
    console.log(error);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente mas tarde.'
    );
  } finally {
    if (geoQuery !== null) {
      channel.close();
    }
    radius = 1 / 2;
  }
}

function* updateGeofireRadius() {
  try {
    radius += 1 / 2;
    console.log(radius);
    if (geoQuery !== null) {
      geoQuery.updateCriteria({
        radius
      });
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Por favor, active su ubicacion para poder visualizar mas datos.'
    );
  }
}

function* carrierLocationWorker(action) {
  yield call(indexCarrierLocation, action.carrier);
}

function* clearHomeSagaWorker(channel) {
  yield take('SignOut');
  if (channel !== undefined) {
    channel.close();
  }

  radius = 1 / 2;
}

function* homeSaga() {
  yield takeLatest(ActionsTypes.HOME_ORDERS_REQUEST, getNearbyOrdersWorker);
  yield takeEvery(ActionsTypes.REQUEST_MORE_ORDERS, updateGeofireRadius);
  yield takeEvery(ActionsTypes.UPDATE_CARRIER_LOCATION, carrierLocationWorker);
}

export default homeSaga;
