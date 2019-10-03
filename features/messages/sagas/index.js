import { call, put, takeEvery } from 'redux-saga/effects';
import { Actions, ActionsTypes } from '../actions';
import { getUserChats } from '../../../api/chatService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';

function* getMessagesWorker(action) {
  try {
    const { uid } = action.request;
    const conversations = yield call(getUserChats, { uid });
    yield put(Actions.messagesSuccess(conversations));
  } catch (e) {
    console.log(e);
    DropDownHelper.alert('error', 'Error', 'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.');
  }
}

function* messagesSaga() {
  yield takeEvery(ActionsTypes.MESSAGES_REQUEST, getMessagesWorker);
}

export default messagesSaga;
