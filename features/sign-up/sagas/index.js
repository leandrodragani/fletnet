import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import {
  signUp,
  saveUser,
  checkUsernameAvailability,
  checkEmailAvailability
} from '../../../api/signUpService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import * as NavigationHelper from '../../../utils/helpers/navigation';
import { CLIENT_USER_TYPE } from '../../../utils/constants/users';

function* clientSignUpWorker(action) {
  try {
    const { fullname, email, password, username, usertype } = action.request;
    const response = yield call(signUp, email, password);
    const data = {
      uid: response.user.uid,
      username,
      fullname,
      email,
      usertype,
      register_date: Date.now(),
      uri_img: ''
    };
    yield call(saveUser, data);
    yield put(Actions.clearState());
    yield put(Actions.signUpResponse());
    DropDownHelper.alert(
      'success',
      '¡Éxito!',
      'Tu usuario fue registrado. Revisá tu email para validar tu cuenta.'
    );
    NavigationHelper.navigate('LoginScreen');
  } catch (e) {
    console.log(e);
    let errorMessage = '';
    switch (e.code) {
      default:
        errorMessage = 'Ha ocurrido un error en el sistema, intente mas tarde.';
        break;
    }
    yield put(Actions.signUpResponse());
    DropDownHelper.alert('error', 'Error', errorMessage);
  }
}

function* carrierSignUpWorker(action) {
  try {
    const { fullname, email, password, username, usertype } = action.request;
    NavigationHelper.navigate('Dni', { fullname, email, password, username, usertype });
    yield put(Actions.clearState());
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente mas tarde.'
    );
  }
}

function* userSignUpWorker(action) {
  const { usertype, username, email } = action.request;
  const userAvailably = yield call(checkUsernameAvailability, username.toUpperCase());
  const emailAvailably = yield call(checkEmailAvailability, email);
  if (userAvailably && emailAvailably) {
    if (usertype === CLIENT_USER_TYPE) {
      yield fork(clientSignUpWorker, action);
    } else {
      yield fork(carrierSignUpWorker, action);
    }
  } else {
    yield put(Actions.signUpResponse());
    DropDownHelper.alert(
      'error',
      'Error',
      `${!userAvailably ? 'El nombre de usuario' : 'El email'} ingresado ya se encuentra en uso.`
    );
  }
}

function* signUpSaga() {
  yield takeEvery(ActionsTypes.USER_SIGNUP_REQUEST, userSignUpWorker);
}

export default signUpSaga;
