import { call, put, takeEvery } from 'redux-saga/effects';
import { mean } from 'lodash';
import { ActionsTypes, Actions } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { getAllCalifications, getUsersCalifications } from '../../../api/reputationService';

function* averageCalificationWorker(action) {
  try {
    const { uid } = action.request;
    const califications = yield call(getAllCalifications, uid);
    let calification;
    if(califications.length == 0){
      calification = 'No contiene';
    } else {
      calification = mean(califications);
    }
    yield put(Actions.averageCalificationResponse(calification));
    yield put(Actions.usersCalificationsRequest({ uid }));
  } catch {
    DropDownHelper.alert('error', 'Error', 'Ocurrió un error en el sistema. Intente mas tarde');
  }
}

function* usersCalificationsWorker(action) {
  try {
    const { uid } = action.request;
    const califications = yield call(getUsersCalifications, uid);
    yield put(Actions.usersCalificationsResponse(califications));
  } catch {
    DropDownHelper.alert('error', 'Error', 'Ocurrió un error en el sistema. Intente mas tarde');
  }
}

function* reputationSaga() {
  yield takeEvery(ActionsTypes.AVERAGE_CALIFICATION_REQUEST, averageCalificationWorker);
  yield takeEvery(ActionsTypes.USERS_CALIFICATIONS_REQUEST, usersCalificationsWorker);
}

export default reputationSaga;
