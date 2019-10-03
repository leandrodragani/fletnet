import { ActionsTypes } from '../actions';

const initialState = {
  user: {},
  auth_listener: null,
  carrierLocationConfig: {
    timeInterval: 15000,
    distanceInterval: 0
  }
};

export default function globalReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.SET_USER:
      return {
        ...state,
        user: action.request
      };
    case ActionsTypes.SET_VERIFY_AUTH_LISTENER:
      return {
        ...state,
        auth_listener: action.request
      };
    case ActionsTypes.SET_CARRIER_LOCATION_CONFIG:
      return {
        ...state,
        carrierLocationConfig: {
          timeInterval: action.config.timeInterval,
          distanceInterval: action.config.distanceInterval,
        }
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
