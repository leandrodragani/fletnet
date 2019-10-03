import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionsTypes, Actions } from '../actions';
import { Actions as GlobalActions } from '../../../redux/global/actions';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { updateUserProfile } from '../../../api/editProfileService';
import * as NavigationHelper from '../../../utils/helpers/navigation';
import { uploadBlob } from '../../../api/blobService';

function* updateUserProfileWorker(action) {
  try {
    const data = {
      uid: action.request.uid,
      fullname: action.request.fullname,
      contact_number: action.request.contact_number,
      type: action.request.type
    };
    if (action.request.profileImage !== null) {
      const profileImage = yield call(uploadBlob, {
        blob: action.request.profileImage.uri,
        path: `users/${data.uid}`,
        filename: 'profile.jpg'
      });
      data.profileImage = profileImage;
    }
    const response = yield call(updateUserProfile, data);
    if (!response.error) {
      yield put(Actions.editProfileSuccess());

      DropDownHelper.alert('success', '¡Éxito!', 'Los cambios fueron realizados correctamente.');
      yield put(GlobalActions.setUser(response));
      NavigationHelper.navigate('Profile');
    } else {
      DropDownHelper.alert(
        'error',
        'Error',
        'Ha ocurrido un error en el sistema, intente mas tarde.'
      );
    }
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema, intente mas tarde.'
    );
  }
  Actions.clearState();
}

function* editProfileSaga() {
  yield takeEvery(ActionsTypes.EDIT_PROFILE_REQUEST, updateUserProfileWorker);
}

export default editProfileSaga;
