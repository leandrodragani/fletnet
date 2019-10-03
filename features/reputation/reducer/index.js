import { ActionsTypes } from '../actions';

const initialState = {
  isFetchingAverage: false,
  isFetchingUsersCalifications: false,
  average: '',
  califications: [],
};

export default function reputation(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.AVERAGE_CALIFICATION_REQUEST:
      return {
        ...state,
        isFetchingAverage: true,
      };
    case ActionsTypes.AVERAGE_CALIFICATION_RESPONSE:
      return {
        ...state,
        isFetchingAverage: false,
        average: action.response
      };
    case ActionsTypes.USERS_CALIFICATIONS_REQUEST:
      return {
        ...state,
        isFetchingUsersCalifications: true,
      };
    case ActionsTypes.USERS_CALIFICATIONS_RESPONSE:
      return {
        ...state,
        isFetchingUsersCalifications: false,
        califications: action.response
      };
    default:
      return state;
  }
}
