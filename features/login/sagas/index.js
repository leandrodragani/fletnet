import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import { login, loginWithGoogle } from '../../../api/loginService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import * as NavigationHelper from '../../../utils/helpers/navigation';
import {
  checkUsernameAvailability,
  saveUser,
  saveUserWithoutSendingEmail,
  checkEmailAvailability
} from '../../../api/signUpService';

function* fetchUserWorker(action) {
  try {
    const { username, password } = action.request;

    const response = yield call(login, username, password);
    yield put(Actions.userLoginResponse());
    if (!response.user.emailVerified) {
      DropDownHelper.alert(
        'error',
        'Error',
        'Revisá tu email para verificar tu correo electrónico'
      );
    } else {
      NavigationHelper.navigate('AuthLoading');
    }
  } catch (e) {
    yield put(Actions.clearState({}));

    let errorMessage = '';

    switch (e.code) {
      case 'auth/user-not-found':
        errorMessage = 'La dirección de email que ha ingresado no se encuentra registrada.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'La dirección de email que ha ingresado es inválida.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'La contraseña que ha ingresado es incorrecta.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Active internet para poder loguearse.';
        break;
      default:
        errorMessage = 'Ha ocurrido un error en el sistema, intente más tarde.';
        break;
    }
    DropDownHelper.alert('error', 'Error', errorMessage);
    console.log(e);
  }
}

function* fetchUserGoogleWorker(action) {
  try {
    if (action.request.type === 'success') {
      const result = yield call(loginWithGoogle, action.request);
      let username = result.user.email.split('@')[0];

      if (username.length >= 20) {
        username = username.slice(0, 10);
      } else {
        username = username.slice(0, username.length - 1);
      }

      const usernameAvailability = yield call(checkUsernameAvailability, username);

      if (usernameAvailability) {
        const emailAvailability = yield call(checkEmailAvailability, result.user.email);
        if (emailAvailability) {
          const data = {
            uid: result.user.uid,
            username,
            fullname: result.user.displayName,
            email: result.user.email,
            usertype: 'C',
            register_date: Date.now(),
            uri_img: result.user.photoURL
          };

          yield call(saveUserWithoutSendingEmail, data);
        }
        yield put(Actions.userLoginResponse({}));
        NavigationHelper.navigate('AuthLoading');
      }
    } else {
      yield put(Actions.clearState({}));
      DropDownHelper.alert(
        'error',
        'Error',
        'Ha ocurrido un error al intentar ingresar con su cuenta de Google, intente mas tarde.'
      );
    }
  } catch (e) {
    console.log(e);
    yield put(Actions.clearState({}));
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error al intentar ingresar con su cuenta de Google, intente mas tarde.'
    );
  }
}

function* loginSaga() {
  yield takeEvery(ActionsTypes.USER_LOGIN_REQUEST, fetchUserWorker);
  yield takeEvery(ActionsTypes.USER_GOOGLE_LOGIN_REQUEST, fetchUserGoogleWorker);
}

export default loginSaga;
