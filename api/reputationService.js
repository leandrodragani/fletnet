import * as firebase from 'firebase';

export async function getAllCalifications(uid) {
  let response = [];
  await firebase
    .database()
    .ref(`users_reputation/${uid}`)
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        response.push(childSnapshot.val().rating);
      });
    });

  return response;
}

export async function getUsersCalifications(uid) {
  let response = [];
  await firebase
    .database()
    .ref(`users_reputation/${uid}`)
    .limitToLast(6)
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        response.push(childSnapshot.val());
      });
    });

  return response;
}
