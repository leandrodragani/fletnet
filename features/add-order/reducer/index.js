import { ActionsTypes } from '../actions';

const initialState = {
  isCalculatingSummary: false,
  isCalculatingSummarySuccess: false,
  orderSummary: {},
  title: '',
  trip: {},
  specs: {},
  vehicleType: ''
};

export default function addOrder(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.CALCULATE_ORDER_SUMMARY_REQUEST:
      return {
        ...state,
        isCalculatingSummary: true
      };
    case ActionsTypes.CALCULATE_ORDER_SUMMARY_SUCCESS:
      return {
        ...state,
        isCalculatingSummary: false,
        orderSummary: action.response,
        isCalculatingSummarySuccess: true
      };
    case ActionsTypes.SET_TITLE:
      return {
        ...state,
        title: action.title
      };
    case ActionsTypes.SET_VEHICLE_TYPE:
      return {
        ...state,
        vehicleType: action.vehicleType
      };
    case ActionsTypes.SET_TRIP:
      return {
        ...state,
        trip: action.trip
      };
    case ActionsTypes.SET_SPECS:
      return {
        ...state,
        specs: action.specs
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
