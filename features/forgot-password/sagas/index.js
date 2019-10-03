import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { forgotPassword } from '../../../api/forgotPasswordService';

function* fetchUserForgotPasswordWorker(action) {
    try {
        const email = yield call(forgotPassword, action.request.email);
        yield put(Actions.userForgotPasswordResponse(email));
        DropDownHelper.alert('success', 'Éxito', "Te hemos enviado un mail para que recuperes tu contraseña.");
    } catch (e) {
        let errorMessage = '';
        switch (e.code) {
            case 'auth/user-not-found':
                errorMessage = 'La dirección de email que ha ingresado no se encuentra registrada.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'La dirección de email que ha ingresado es inválida.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Active internet para poder loguearse.';
                break;
            default:
                errorMessage = 'Ha ocurrido un error en el sistema, intente más tarde.';
                break;
        }
        DropDownHelper.alert('error', 'Error', errorMessage);
        yield put(Actions.clearState({}));
        console.log(e);
    }
}
function* forgotPasswordSaga() {
    yield takeEvery(ActionsTypes.USER_FORGOT_PASSWORD_REQUEST, fetchUserForgotPasswordWorker);
}

export default forgotPasswordSaga;
