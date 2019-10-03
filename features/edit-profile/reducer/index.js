import { ActionsTypes } from '../actions';

const initialState = {
  isEditProfileFetching: false,
  isEditProfileSuccess: false
};

export default function editProfileReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isEditProfileFetching: true
      };
    case ActionsTypes.EDIT_PROFILE_RESPONSE:
      return {
        ...state,
        isEditProfileFetching: false,
        isEditProfileSuccess: true
      };
    case ActionsTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
