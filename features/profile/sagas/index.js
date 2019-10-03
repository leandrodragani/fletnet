import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../../../redux/global/actions';
import { userSignOut } from '../../../api/loginService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import * as NavigationHelper from '../../../utils/helpers/navigation';

function* userSignOutWorker(action) {
  try {
    yield call(userSignOut);
    yield put(Actions.signOutSuccess());
    NavigationHelper.navigate('LoginScreen');
  } catch (e) {
    DropDownHelper.alert('error', 'Error', 'Hubo un error en el sistema. Intente más tarde.');
  }
}

function* profileSaga() {
  yield takeEvery(ActionsTypes.USER_SIGN_OUT_REQUEST, userSignOutWorker);
}

export default profileSaga;
