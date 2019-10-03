import * as firebase from 'firebase';
import { Notifications } from 'expo';
import { CARRIER_USER_TYPE } from '../utils/constants/users';

export function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function checkUsernameAvailability(username) {
  let response = false;
  await firebase
    .database()
    .ref()
    .child('users')
    .orderByChild('username')
    .equalTo(username)
    .once('value', (snapshot) => {
      const userData = snapshot.val();
      if (!userData) {
        response = true;
      }
    });
  return response;
}

export function checkEmailFormat(email) {
  const validEmailReg = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return validEmailReg.test(email);
}

export function checkUsernameFormat(username) {
  const validUsernameReg = new RegExp(/^[a-zA-Z0-9-_]{4,20}$/);
  return validUsernameReg.test(username);
}

export function checkFullnameFormat(fullname) {
  const validFullnameReg = new RegExp(
    /^[ñÑÁáÉéÍíÓóÚúa-zA-Z\.\'\-]{2,40}(?: [ñÑÁáÉéÍíÓóÚúa-zA-Z\.\'\-]{2,40})+$/
  );
  return validFullnameReg.test(fullname);
}

export function checkEmptyField(field) {
  return field === '';
}

export function checkValidPhoneNumber(phoneNumber) {
  const phoneNumberRegWithDash = new RegExp(/^(?:\(\d{3}\)|\d{3}-)\d{4}-\d{4}$/);
  const phoneNumberRegWithSpace = new RegExp(/^(?:\(\d{3}\)|\d{3} )\d{4} \d{4}$/);
  const phoneNumberRegWithoutSpace = new RegExp(/^(?:\(\d{3}\)|\d{3})\d{4}\d{4}$/);

  return (
    phoneNumberRegWithDash.test(phoneNumber) ||
    phoneNumberRegWithSpace.test(phoneNumber) ||
    phoneNumberRegWithoutSpace.test(phoneNumber)
  );
}

export async function saveUser(data) {
  saveUserWithoutSendingEmail(data);

  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(
      () => {},
      (error) => {
        console.log(`email was not sent ${error}`);
      }
    );
}

export async function saveUserWithoutSendingEmail(data) {
  const database = firebase.database();

  const userObject = {
    username: data.username.toUpperCase(),
    email: data.email,
    fullname: data.fullname,
    type: data.usertype,
    register_date: data.register_date,
    uri_img: data.uri_img
  };

  if (data.usertype === CARRIER_USER_TYPE) {
    userObject.dni = data.dni;
    userObject.contact_number = data.contact_number;
  }

  database.ref(`users/${data.uid}`).set(userObject);

  const token = await Notifications.getExpoPushTokenAsync();
  const updates = {};
  updates['/push_notification_token'] = token;
  firebase
    .database()
    .ref(`users/${data.uid}`)
    .update(updates);
}

export async function checkEmailAvailability(email) {
  let response = false;
  await firebase
    .database()
    .ref()
    .child('users')
    .orderByChild('email')
    .equalTo(email)
    .once('value', (snapshot) => {
      const userData = snapshot.val();
      if (!userData) {
        response = true;
      }
    });
  return response;
}

export async function saveVehicleDetail(vehicle) {
  await firebase
    .database()
    .ref(`users/${vehicle.uid}/vehicle`)
    .set({
      model: vehicle.model,
      tara: vehicle.tara,
      license_plate: vehicle.patente.toUpperCase(),
      brand: vehicle.brand,
      type: vehicle.type,
      validate: vehicle.validate,
      uri_vehicle: vehicle.uri_vehicle
    });
}
