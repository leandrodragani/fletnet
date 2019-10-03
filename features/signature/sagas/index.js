import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { saveSignature } from '../../../api/signatureService';
import { ActionsTypes, Actions } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { setOrderTrackingStat, getOrder } from '../../../api/orderDetailService';
import {
  getTokenPushNotificationUser,
  sendPushNotification
} from '../../../api/pushNotificationsService';
import { ORDER_TRACKING_STATUS_CLOSE } from '../../../utils/constants/orders';
import { NOTIFICATION_RATE } from '../../../utils/constants/notifications';

function* saveSignatureWorker(action) {
  try {
    const data = {
      order_id: action.request.order_id,
      signature: action.request.signature
    };

    const response = yield call(saveSignature, data);
    if (response != null) {
      const response = yield call(setOrderTrackingStat, {
        orderId: action.request.order_id,
        status: ORDER_TRACKING_STATUS_CLOSE,
        client_uid: action.request.client_uid,
        carrier_uid: action.request.carrier_uid
      });
      const token = yield call(getTokenPushNotificationUser, action.request.client_uid);
      const order = yield call(getOrder, action.request.order_id);
      let body = {
        to: token,
        data: {
          type: NOTIFICATION_RATE,
          read: false,
          order,
          user_rated: action.request.carrier_uid
        }
      };
      body.title = `¡${
        action.request.fullname
      } ya entregó tu pedido ${action.request.title.substring(0, 55)}!. Calificá el servicio.`;
      body.data.title = `¡${
        action.request.fullname
      } ya entregó tu pedido ${action.request.title.substring(0, 55)}!. Calificá el servicio.`;

      yield fork(sendPushNotification, { body, uid: action.request.client_uid });
      yield put(Actions.saveSignatureSuccess());
      DropDownHelper.alert('success', 'Éxito', 'La firma ha sido guardada correctamente.');
    }
  } catch (e) {
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente más tarde.'
    );
    console.log(e);
  }
}

function* signatureSaga() {
  yield takeEvery(ActionsTypes.SAVE_SIGNATURE_REQUEST, saveSignatureWorker);
}

export default signatureSaga;
