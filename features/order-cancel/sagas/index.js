import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { cancelOrder } from '../../../api/orderDetailService';

function* cancelOrderWorker(action) {
  try {
    const response = yield call(cancelOrder, action.request);
    if (!response.error) {
      yield put(Actions.orderCancelResponse(response));
    } else {
      DropDownHelper.alert('error', 'Error', 'Ha ocurrido un error al intentar cancelar el pedido, intente más tarde');
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert('error', 'Error', 'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo más tarde.');
  }
}

function* orderCancelSaga() {
  yield takeEvery(ActionsTypes.ORDER_CANCEL_REQUEST, cancelOrderWorker);
}

export default orderCancelSaga;
