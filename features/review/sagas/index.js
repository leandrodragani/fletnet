import { call, put, takeEvery } from 'redux-saga/effects';
import { sendReview } from '../../../api/reviewService';
import { checkStringIsEmpty } from '../../../utils/string-utils';
import { ActionsTypes, Actions } from '../actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';

function* reviewSaveWorker(action) {
  try {
    const commentFieldEmpty = yield call(checkStringIsEmpty, action.request.comments);

    if (commentFieldEmpty) {
      DropDownHelper.alert('error', 'Error', 'El campo comentario no puede estar vacio.');
    } else {
      const data = {
        message: action.request.comments,
        email: action.request.email
      };
      const response = yield call(sendReview, data);
      if (!(response.status === 200) || (response === 'TypeError: Network request failed')) {
        DropDownHelper.alert('error', 'Error', 'Ha ocurrido un error en el sistema, intente más tarde.');
      } else {
        yield put(Actions.reviewSuccess());
      }
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert('error', 'Error', 'Ha ocurrido un error en el sistema, intente más tarde.');
  }
  yield put(Actions.clearState());
}

function* reviewSaga() {
  yield takeEvery(ActionsTypes.REVIEW_REQUEST, reviewSaveWorker);
}

export default reviewSaga;
