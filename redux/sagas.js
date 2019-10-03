import { all } from 'redux-saga/effects';
import loginSaga from '../features/login/sagas';
import forgotPasswordSaga from '../features/forgot-password/sagas';
import signUpSaga from '../features/sign-up/sagas';
import addOrderSaga from '../features/add-order/sagas';
import signatureSaga from '../features/signature/sagas';
import homeSaga from '../features/home/sagas';
import reviewSaga from '../features/review/sagas';
import profileSaga from '../features/profile/sagas';
import editProfileSaga from '../features/edit-profile/sagas';
import carrierDocumentationSaga from '../features/carrier-documentation/sagas';
import ordersSaga from '../features/orders/sagas';
import notificationsSaga from '../features/notifications/sagas';
import chatSaga from '../features/chat/sagas';
import messagesSaga from '../features/messages/sagas';
import orderDetailSaga from '../features/order-detail/sagas';
import rateSaga from '../features/rate/sagas';
import paymentSaga from '../features/payment/sagas';
import orderCancelSaga from '../features/order-cancel/sagas';
import orderTrackingSaga from '../features/order-tracking/sagas';
import reputationSaga from '../features/reputation/sagas';
import answerQuestionSaga from '../features/answer-question/sagas';

export default function* rootSaga(getState) {
  yield all([
    loginSaga(),
    signUpSaga(),
    forgotPasswordSaga(),
    addOrderSaga(),
    signatureSaga(),
    reviewSaga(),
    profileSaga(),
    editProfileSaga(),
    homeSaga(),
    carrierDocumentationSaga(),
    ordersSaga(),
    notificationsSaga(),
    chatSaga(),
    messagesSaga(),
    orderDetailSaga(),
    rateSaga(),
    paymentSaga(),
    orderTrackingSaga(),
    orderCancelSaga(),
    reputationSaga(),
    answerQuestionSaga()
  ]);
}
