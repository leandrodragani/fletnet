/* eslint-disable no-param-reassign */
import { call, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { Actions, ActionsTypes } from '../actions';
import {
  getUsersOrdersRef
} from '../../../api/ordersService';
import { getOrder } from '../../../api/orderDetailService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';

function ordersWatcher(buffer, query) {
  return eventChannel((emit) => {
    query.on('child_added', (snapshot) => {
      getOrder(snapshot.key).then((order) => {
        order.status = snapshot.val().status;
        emit(Actions.addOrder(order));
      });
    });

    query.on('child_changed', (snapshot) => {
      getOrder(snapshot.key).then((order) => {
        order.status = snapshot.val().status;
        emit(Actions.updateOrder(order));
      });
    });

    query.on('child_removed', (snapshot) => {
      emit(Actions.deleteOrder(snapshot.key));
    });

    query.once('value', (snapshot) => {
      if (snapshot.numChildren() === 0) {
        emit(Actions.ordersSuccess());
      }
    });

    return () => {
      query.off();
    };
  }, buffer);
}

function* getOrdersWorker(action) {
  let channel;
  let query;
  try {
    const buffer = buffers.expanding();
    const { uid } = action.request;

    query = yield call(getUsersOrdersRef, uid);
    channel = yield call(ordersWatcher, buffer, query);

    // yield fork(clearOrdersSagaWorker, channel);

    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (error) {
    console.log(error);
    DropDownHelper.alert('error', 'Error', 'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.');
  } finally {
    if (channel !== undefined) {
      channel.close();
    }
  }
}

function* ordersSaga() {
  yield takeLatest(ActionsTypes.ORDERS_REQUEST, getOrdersWorker);
}

export default ordersSaga;
