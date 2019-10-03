import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { Actions, ActionsTypes } from '../actions';
import { getPolyline, getMinPrice, getOptimizedRoadmap } from '../../../api/addOrderService';
import { decodePolylines } from '../../../utils/helpers/mapview';
import { DropDownHelper } from '../../../utils/helpers/dropdown';

function* calculateOrderSummaryWorker(action) {
  try {
    const priceConfig = yield call(
      getMinPrice,
      action.request.vehicleType
    );

    let dataApi;
    let orderType;
    if (action.request.destinations.length > 1) {
      orderType = 'distribution';
      dataApi = yield call(
        getOptimizedRoadmap,
        action.request.origin.coordinates,
        action.request.origin.coordinates,
        action.request.destinations
      );
    } else {
      orderType = 'express';
      dataApi = yield call(
        getPolyline,
        action.request.origin.coordinates,
        action.request.destinations[0].coordinates
      );
    }
    const { duration, distance } = dataApi.routes[0].legs[0];
    const polyline = decodePolylines(
      dataApi.routes[0].overview_polyline.points
    );

    let orderValue = priceConfig.base + (distance.value / 1000) * priceConfig.km_price + Math.floor(duration.value / 60) * priceConfig.minute_price;

    if (Object.prototype.hasOwnProperty.call(priceConfig, 'minimum_price')
      && priceConfig.minimum_price > orderValue) {
      orderValue = priceConfig.minimum_price;
    }

    if (action.request.withReturn) {
      orderValue += orderValue * 0.1;
    }

    let hours = Math.round(duration.value / 3600);

    if (hours === 0) {
      hours = 1;
    }

    if (action.request.assistant) {
      orderValue += hours * 350;
    }

    orderValue = Math.round(orderValue);

    yield put(
      Actions.calculateOrderSummarySuccess({
        value: orderValue,
        polyline,
        orderType,
        duration: duration.text,
        distance: distance.text,
        overview_polyline: dataApi.routes[0].overview_polyline.points
      })
    );
  } catch (e) {
    console.log(e);
    DropDownHelper.alert('error', 'Error', 'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.');
  }
}

function* addOrderSaga() {
  yield takeEvery(ActionsTypes.CALCULATE_ORDER_SUMMARY_REQUEST, calculateOrderSummaryWorker);
}

export default addOrderSaga;
