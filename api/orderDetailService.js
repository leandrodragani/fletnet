import firebase from 'firebase';
import { getVehicleTypeValue } from '../utils/vehicle-utils';
import {
  ORDER_STATUS_PENDING,
  ORDER_TRACKING_STATUS_PENDING,
  ORDER_STATUS_ACCEPTED,
  ORDER_STATUS_CANCELLED,
  ORDER_TRACKING_STATUS_CANCELLED,
  ORDER_TRACKING_STATUS_CLOSE,
  ORDER_STATUS_DELIVERED
} from '../utils/constants/orders';

export async function getOrder(orderId) {
  let order = {};
  await firebase
    .database()
    .ref(`orders/${orderId}`)
    .once('value', (snapshot) => {
      order = snapshot.val();
      order.id = snapshot.key;
    });

  return order;
}

export async function getUser(userId) {
  let user;
  await firebase
    .database()
    .ref(`users/${userId}`)
    .once('value', (snapshot) => {
      user = snapshot.val();
      user.uid = snapshot.key;
    });

  return user;
}

export async function getQuestions(orderId) {
  let questions = [];
  let counter = 0;
  await firebase
    .database()
    .ref(`order_questions/${orderId}`)
    .once('value', (snapshot) => {
      snapshot.forEach((child) => {
        questions.push(child.val());
        questions[counter].id = child.key;
        counter += 1;
      });
    });

  return questions;
}

export async function verifyVehiclePostulation(vehicleType, requiredVehicleType) {
  const vehicleValue = getVehicleTypeValue(vehicleType);
  const requiredVehicleValue = getVehicleTypeValue(requiredVehicleType);

  return vehicleValue >= requiredVehicleValue;
}

export async function verifyOrderStatus(request) {
  let status;
  await firebase
    .database()
    .ref(`users_orders/${request.clientUID}/${request.orderID}/status`)
    .once('value', (snapshot) => {
      status = snapshot.val();
    });
  return status === ORDER_STATUS_PENDING;
}

export async function performService(request) {
  const root = firebase.database().ref();
  let response = {};
  let updateObject = {};

  updateObject[
    `users_orders/${request.carrier.uid}/${request.orderID}/status`
  ] = ORDER_STATUS_PENDING;
  updateObject[`users_orders/${request.carrier.uid}/${request.orderID}/client_id`] =
    request.clientUID;
  updateObject[`users_orders/${request.carrier.uid}/${request.orderID}/timestamp`] =
    request.timestamp;

  updateObject[
    `users_orders/${request.clientUID}/${request.orderID}/status`
  ] = ORDER_STATUS_ACCEPTED;

  updateObject[`orders/${request.orderID}/carrier_uid`] = request.carrier.uid;

  updateObject[`order_tracking/${request.orderID}/carrier_uid`] = request.carrier.uid;
  updateObject[`order_tracking/${request.orderID}/client_uid`] = request.clientUID;
  updateObject[`order_tracking/${request.orderID}/status`] = ORDER_TRACKING_STATUS_PENDING;
  updateObject[`order_tracking/${request.orderID}/value`] = request.value;

  updateObject[`chat/${request.carrier.uid}/${request.clientUID}/conversation`] = request.orderID;
  updateObject[`chat/${request.clientUID}/${request.carrier.uid}/conversation`] = request.orderID;

  updateObject[`orders_locations/${request.orderID}`] = null;

  const error = await root.update(updateObject);

  if (error) {
    response.error = error;
  }

  return response;
}

export async function insertNewQuestion(request) {
  const root = firebase.database().ref();
  const questionKey = root.child(`order_questions/${request.orderId}`).push().key;

  let updateObject = {};
  let response = {};

  updateObject[`order_questions/${request.orderId}/${questionKey}/client_uid`] = request.clientUid;
  updateObject[`order_questions/${request.orderId}/${questionKey}/question`] = request.question;
  updateObject[`order_questions/${request.orderId}/${questionKey}/timestamp`] = Date.now();
  updateObject[`order_questions/${request.orderId}/${questionKey}/carrier_username`] =
    request.carrierUsername;
  updateObject[`order_questions/${request.orderId}/${questionKey}/carrier_uid`] =
    request.carrierUid;

  const error = await root.update(updateObject);

  if (error) {
    response.error = error;
  } else {
    response.questionId = questionKey;
  }

  return response;
}

export function checkValidQuestion(question) {
  const numbers = question.replace(/[^0-9]/g, '').length;
  const questionUpperCase = question.toUpperCase();
  const includeNumberInLetter =
    questionUpperCase.includes('UNO') ||
    questionUpperCase.includes('DOS') ||
    questionUpperCase.includes('EIGTH') ||
    questionUpperCase.includes('NINE') ||
    questionUpperCase.includes('TRES') ||
    questionUpperCase.includes('CUATRO') ||
    questionUpperCase.includes('CINCO') ||
    questionUpperCase.includes('SEIS') ||
    questionUpperCase.includes('SIETE') ||
    questionUpperCase.includes('OCHO') ||
    questionUpperCase.includes('NUEVE') ||
    question.toUpperCase().includes('ONE') ||
    questionUpperCase.includes('TWO') ||
    questionUpperCase.includes('THREE') ||
    questionUpperCase.includes('FOUR') ||
    questionUpperCase.includes('FIVE') ||
    questionUpperCase.includes('SIX') ||
    questionUpperCase.includes('SEVEN');
  const response = !includeNumberInLetter && numbers < 3;
  return response;
}

export async function getOrderTrackingRef(orderId) {
  return await firebase.database().ref(`order_tracking/${orderId}`);
}

export async function setOrderTrackingStat(request) {
  let user_order_status = request.status;
  if (request.status == ORDER_TRACKING_STATUS_CLOSE) {
    user_order_status = ORDER_STATUS_DELIVERED;
  }
  await firebase
    .database()
    .ref(`users_orders/${request.client_uid}/${request.orderId}`)
    .update({ status: user_order_status });
  await firebase
    .database()
    .ref(`users_orders/${request.carrier_uid}/${request.orderId}`)
    .update({ status: user_order_status });
  return await firebase
    .database()
    .ref(`order_tracking/${request.orderId}`)
    .update({ status: request.status });
}

export async function getUserOrderTracking(orderId) {
  let order = '';

  await firebase
    .database()
    .ref(`order_tracking/${orderId}`)
    .once('value', (snapshot) => {
      order = snapshot.val();
    });

  return order;
}

export async function getLocationCarrierRef(uid) {
  return await firebase.database().ref(`carriers_locations/${uid}`);
}

export async function cancelOrder(request) {
  const root = firebase.database().ref();
  let response = {};
  let updateObject = {};

  updateObject[`orders_locations/${request.orderID}`] = null;
  updateObject[`users_orders/${request.uid}/${request.orderID}/status`] = ORDER_STATUS_CANCELLED;

  if (request.trackingStatus != null) {
    updateObject[`order_tracking/${request.orderID}/status`] = ORDER_TRACKING_STATUS_CANCELLED;
    await firebase
      .database()
      .ref(`order_tracking/${request.orderID}`)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          updateObject[
            `users_orders/${snapshot.val().carrier_uid}/${request.orderID}/status`
          ] = ORDER_STATUS_CANCELLED;
        }
      });
  }
  const error = await root.update(updateObject);

  if (error) {
    response.error = error;
  }

  return response;
}
