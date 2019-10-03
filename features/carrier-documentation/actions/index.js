import { makeActionCreator } from '../../../utils/helpers/redux';

const SET_INSURANCE_IMAGE = 'carrierdoc/SET_INSURANCE_IMAGE';
const SET_CARRIER_PROFILE_IMAGE = 'carrierdoc/SET_CARRIER_PROFILE_IMAGE';
const SET_CARRIER_VEHICLE_IMAGE = 'carrierdoc/SET_CARRIER_VEHICLE_IMAGE';
const SET_MONOTRIBUTO_IMAGE = 'carrierdoc/SET_MONOTRIBUTO_IMAGE';
const SET_LNH_IMAGE = 'carrierdoc/SET_LNH_IMAGE';
const SET_DRIVER_LICENSE_IMAGE = 'carrierdoc/ADD_DRIVER_LICENSE_IMAGE';
const SET_IDENTIFICATION_IMAGE = 'carrierdoc/ADD_IDENTIFICATION_IMAGE';
const CARRIER_DOCUMENTATION_REQUEST = 'carrierdoc/CARRIER_DOCUMENTATION_REQUEST';
const CARRIER_DOCUMENTATION_SUCCESS = 'carrierdoc/CARRIER_DOCUMENTATION_SUCCESS';
const VEHICLE_BRANDS_REQUEST = 'carrierdoc/VEHICLE_BRANDS_REQUEST';
const VEHICLE_MODELS_REQUEST = 'carrierdoc/VEHICLE_MODELS_REQUEST';
const VEHICLE_BRANDS_SUCCESS = 'carrierdoc/VEHICLE_BRANDS_REQUEST_SUCCESS';
const VEHICLE_MODELS_SUCCESS = 'carrierdoc/VEHICLE_MODELS_REQUEST_SUCCESS';
const SET_VEHICLE_TYPE = 'carrierdoc/SET_VEHICLE_TYPE';
const SET_CREDENTIALS = 'carrierdoc/SET_CREDENTIALS';
const CLEAR_STATE = 'carrierdoc/CLEAR_STATE';

export const setInsuranceImage = makeActionCreator(SET_INSURANCE_IMAGE, 'image');
export const setCarrierProfileImage = makeActionCreator(SET_CARRIER_PROFILE_IMAGE, 'image');
export const setCarrierVehicleImage = makeActionCreator(SET_CARRIER_VEHICLE_IMAGE, 'image');
export const setMonotributoImage = makeActionCreator(SET_MONOTRIBUTO_IMAGE, 'image');
export const setLnhImage = makeActionCreator(SET_LNH_IMAGE, 'image');
export const setDriverLicenseImage = makeActionCreator(SET_DRIVER_LICENSE_IMAGE, 'image');
export const setIdentificationImage = makeActionCreator(SET_IDENTIFICATION_IMAGE, 'image');
export const carrierDocumentationRequest = makeActionCreator(
  CARRIER_DOCUMENTATION_REQUEST,
  'request'
);
export const carrierDocumentationSuccess = makeActionCreator(
  CARRIER_DOCUMENTATION_SUCCESS,
  'response'
);
export const vehicleBrandsRequest = makeActionCreator(VEHICLE_BRANDS_REQUEST, 'request');
export const vehicleBrandsSuccess = makeActionCreator(VEHICLE_BRANDS_SUCCESS, 'response');
export const vehicleModelsRequest = makeActionCreator(VEHICLE_MODELS_REQUEST, 'request');
export const vehicleModelsSuccess = makeActionCreator(VEHICLE_MODELS_SUCCESS, 'response');
export const setVehicleType = makeActionCreator(SET_VEHICLE_TYPE, 'vehicleType');
export const setCredentials = makeActionCreator(SET_CREDENTIALS, 'credentials');
export const clearState = makeActionCreator(CLEAR_STATE, 'response');

export const ActionsTypes = {
  SET_INSURANCE_IMAGE,
  SET_CARRIER_PROFILE_IMAGE,
  SET_CARRIER_VEHICLE_IMAGE,
  SET_MONOTRIBUTO_IMAGE,
  SET_LNH_IMAGE,
  SET_DRIVER_LICENSE_IMAGE,
  SET_IDENTIFICATION_IMAGE,
  CARRIER_DOCUMENTATION_REQUEST,
  CARRIER_DOCUMENTATION_SUCCESS,
  VEHICLE_BRANDS_REQUEST,
  VEHICLE_MODELS_REQUEST,
  VEHICLE_BRANDS_SUCCESS,
  VEHICLE_MODELS_SUCCESS,
  SET_CREDENTIALS,
  CLEAR_STATE,
  SET_VEHICLE_TYPE
};

export const Actions = {
  setInsuranceImage,
  setCarrierProfileImage,
  setCarrierVehicleImage,
  setMonotributoImage,
  setLnhImage,
  setDriverLicenseImage,
  setIdentificationImage,
  carrierDocumentationRequest,
  carrierDocumentationSuccess,
  vehicleBrandsRequest,
  vehicleBrandsSuccess,
  vehicleModelsRequest,
  vehicleModelsSuccess,
  setCredentials,
  clearState
};
