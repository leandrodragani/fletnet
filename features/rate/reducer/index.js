import { ActionsTypes } from '../actions';

const initialState = {
  isFetching: false,
  success: false,
  user: { uri_img: '', fullname: '', username: '', vehicle: { brand: '', license_plate: '' } }
};

export default function rateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.USER_RATE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionsTypes.SET_USER_SUCCESS:
      return {
        ...state,
        user: action.response
      };
    case ActionsTypes.USER_RATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: true
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
