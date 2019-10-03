import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Actions, ActionsTypes } from '../actions';
import {
  getVehicleBrands,
  getVehicleModels,
  saveVehicleDetail
} from '../../../api/carrierDocumentationService';
import { DropDownHelper } from '../../../utils/helpers/dropdown';
import { uploadBlob } from '../../../api/blobService';
import { saveUser, signUp } from '../../../api/signUpService';
import * as NavigationHelper from '../../../utils/helpers/navigation';

function* getVehicleBrandsWorker(action) {
  try {
    const vehicleBrands = yield call(getVehicleBrands, action.request);
    yield put(Actions.vehicleBrandsSuccess(vehicleBrands));
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
  }
}

function* getVehicleModelsWorker(action) {
  try {
    const vehicleModels = yield call(getVehicleModels, action.request.id);
    yield put(Actions.vehicleModelsSuccess(vehicleModels));
  } catch (e) {
    console.log(e);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
  }
}

function* saveDocumentationWorker(action) {
  try {
    const response = yield call(
      signUp,
      action.request.credentials.email,
      action.request.credentials.password
    );

    const { uid } = response.user;

    const [dni, driverLicense, insurance, monotributo, vehicle, profile] = yield all([
      call(uploadBlob, {
        blob: action.request.dni.uri,
        path: `carriers/${uid}`,
        filename: 'dni.jpg'
      }),
      call(uploadBlob, {
        blob: action.request.driverLicense.uri,
        path: `carriers/${uid}`,
        filename: 'driverLicense.jpg'
      }),
      call(uploadBlob, {
        blob: action.request.insurance.uri,
        path: `carriers/${uid}`,
        filename: 'insurance.jpg'
      }),
      call(uploadBlob, {
        blob: action.request.monotributo.uri,
        path: `carriers/${uid}`,
        filename: 'monotributo.jpg'
      }),
      call(uploadBlob, {
        blob: action.request.vehicle.uri,
        path: `carriers/${uid}`,
        filename: 'vehicle.jpg'
      }),
      call(uploadBlob, {
        blob: action.request.profile.uri,
        path: `users/${uid}`,
        filename: 'profile.jpg'
      })
    ]);
    if (action.request.lnh !== undefined) {
      const lnh = yield call(uploadBlob, {
        blob: action.request.lnh.uri,
        path: `carriers/${uid}`,
        filename: 'lnh.jpg'
      });
    }

    const data = {
      uid,
      username: action.request.credentials.username,
      fullname: action.request.credentials.fullname,
      email: action.request.credentials.email,
      usertype: action.request.credentials.usertype,
      register_date: Date.now(),
      uri_img: profile,
      dni: action.request.dniNumber,
      contact_number: action.request.telephone
    };

    yield call(saveUser, data);

    const vehicleData = {
      uid,
      tara: action.request.tara,
      model: action.request.model,
      license_plate: action.request.licensePlate.toUpperCase(),
      brand: action.request.brand,
      type: action.request.vehicleType,
      validate: false,
      uri_vehicle: vehicle
    };

    yield call(saveVehicleDetail, vehicleData);

    DropDownHelper.alert(
      'success',
      '¡Éxito!',
      'Tu usuario fue registrado. Revisá tu email para validar tu cuenta.'
    );
    NavigationHelper.navigate('LoginScreen');
    yield put(Actions.carrierDocumentationSuccess());
  } catch (error) {
    console.log(error);
    DropDownHelper.alert(
      'error',
      'Error',
      'Ha ocurrido un error en el sistema. Por favor, intenta de nuevo mas tarde.'
    );
  }
  Actions.clearState();
}

function* carrierDocumentationSaga() {
  yield takeEvery(ActionsTypes.VEHICLE_BRANDS_REQUEST, getVehicleBrandsWorker);
  yield takeEvery(ActionsTypes.VEHICLE_MODELS_REQUEST, getVehicleModelsWorker);
  yield takeEvery(ActionsTypes.CARRIER_DOCUMENTATION_REQUEST, saveDocumentationWorker);
}

export default carrierDocumentationSaga;
