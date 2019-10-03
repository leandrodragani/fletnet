import { ActionsTypes } from '../actions';

const initialState = {
  monotributo: undefined,
  lnh: undefined,
  dni: undefined,
  insurance: undefined,
  profile: undefined,
  vehicle: undefined,
  driverLicense: undefined,
  isSavingCarrier: false,
  credentials: undefined,
  brands: [],
  models: [],
  vehicleType: ''
};

export default function carrierDocumentationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.SET_CARRIER_PROFILE_IMAGE:
      return {
        ...state,
        profile: action.image
      };
    case ActionsTypes.SET_VEHICLE_TYPE:
      return {
        ...state,
        vehicleType: action.vehicleType
      };
    case ActionsTypes.SET_CARRIER_VEHICLE_IMAGE:
      return {
        ...state,
        vehicle: action.image
      };
    case ActionsTypes.SET_DRIVER_LICENSE_IMAGE:
      return {
        ...state,
        driverLicense: action.image
      };
    case ActionsTypes.SET_INSURANCE_IMAGE:
      return {
        ...state,
        insurance: action.image
      };
    case ActionsTypes.SET_LNH_IMAGE:
      return {
        ...state,
        lnh: action.image
      };
    case ActionsTypes.SET_MONOTRIBUTO_IMAGE:
      return {
        ...state,
        monotributo: action.image
      };
    case ActionsTypes.SET_IDENTIFICATION_IMAGE:
      return {
        ...state,
        dni: action.image
      };
    case ActionsTypes.CARRIER_DOCUMENTATION_REQUEST:
      return {
        ...state,
        isSavingCarrier: true
      };
    case ActionsTypes.CARRIER_DOCUMENTATION_SUCCESS:
      return {
        ...state,
        isSavingCarrier: false
      };
    case ActionsTypes.VEHICLE_MODELS_SUCCESS:
      return {
        ...state,
        models: action.response
      };
    case ActionsTypes.VEHICLE_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.response
      };
    case ActionsTypes.SET_CREDENTIALS:
      return {
        ...state,
        credentials: action.credentials
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
