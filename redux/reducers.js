import login from '../features/login/reducer';
import signUp from '../features/sign-up/reducer';
import forgotPassword from '../features/forgot-password/reducer';
import addOrder from '../features/add-order/reducer';
import homeReducer from '../features/home/reducer';
import signatureReducer from '../features/signature/reducer';
import reviewReducer from '../features/review/reducer';
import editProfileReducer from '../features/edit-profile/reducer';
import globalReducer from './global/reducers';
import carrierDocumentationReducer from '../features/carrier-documentation/reducer';
import ordersReducer from '../features/orders/reducer';
import notificationsReducer from '../features/notifications/reducer';
import chatReducer from '../features/chat/reducer';
import messagesReducer from '../features/messages/reducer';
import rateReducer from '../features/rate/reducer';
import orderDetailReducer from '../features/order-detail/reducer';
import paymentReducer from '../features/payment/reducer';
import orderCancelReducer from '../features/order-cancel/reducer';
import orderTrackingReducer from '../features/order-tracking/reducer';
import reputation from '../features/reputation/reducer';
import answerQuestionReducer from '../features/answer-question/reducer';

export default {
  login,
  signUp,
  forgotPassword,
  addOrder,
  globalReducer,
  signatureReducer,
  reviewReducer,
  editProfileReducer,
  homeReducer,
  carrierDocumentationReducer,
  ordersReducer,
  notificationsReducer,
  chatReducer,
  messagesReducer,
  rateReducer,
  orderDetailReducer,
  paymentReducer,
  orderTrackingReducer,
  orderCancelReducer,
  reputation,
  answerQuestionReducer
};
