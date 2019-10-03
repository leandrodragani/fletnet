import * as firebase from 'firebase';

export async function getUsersOrdersRef(uid) {
  return await firebase
    .database()
    .ref(`users_orders/${uid}`)
    .orderByChild('create_date');
}

export async function getUsersOffersRef(uid) {
  return await firebase
    .database()
    .ref(`users_offers/${uid}`)
    .orderByChild('create_date');
}
