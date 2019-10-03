import * as firebase from 'firebase';
import { CARRIER_USER_TYPE } from '../utils/constants/users';
import { store } from '../redux/store';

export async function updateUserProfile(request) {
  const { user } = store.getState().globalReducer;
  const root = firebase.database().ref();
  let response = {};
  const updateObject = {};

  if (request.fullname != null) {
    updateObject[`users/${request.uid}/fullname`] = request.fullname;
    user.fullname = request.fullname;
  }
  if (request.profileImage !== undefined) {
    updateObject[`users/${request.uid}/uri_img`] = request.profileImage;
    user.uri_img = request.profileImage;
  }
  if (request.user_type === CARRIER_USER_TYPE && request.contact_number != null) {
    updateObject[`users/${request.uid}/contact_number`] = request.contact_number;
    user.contact_number = request.contact_number;
  }

  const errorEditProfile = await root.update(updateObject);

  if (errorEditProfile) {
    response.error = errorEditProfile;
  }
  response = user;
  return response;
}
