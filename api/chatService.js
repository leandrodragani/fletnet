import firebase from 'firebase';
import { map } from 'lodash';

export async function getUserChats(request) {
  let promises = [];

  await firebase
    .database()
    .ref(`chat/${request.uid}`)
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        promises.push(firebase
          .database()
          .ref(`users/${childSnapshot.key}`)
          .once('value'));
      });
    });

  return Promise.all(promises).then((results) => {
    const response = map(results, (result) => {
      return {
        uid: result.key,
        username: result.val().username,
        uri_img: result.val().uri_img,
        lastMessage: 'Haga click aquí para ver la conversación'
      };
    });

    return response;
  });
}

export async function existsConversation(data) {
  let exists;
  await firebase
    .database()
    .ref(`chat/${data.transmitter}/${data.receiver}`)
    .once('value')
    .then(async (snapshot) => {
      await firebase
        .database()
        .ref(`conversation/${snapshot.val().conversation}`)
        .once('value', (conversation) => {
          exists = conversation.exists();
        });
    });

  return exists;
}

export async function getConversationId(data) {
  let response;
  await firebase
    .database()
    .ref(`chat/${data.transmitter}/${data.receiver}`)
    .once('value')
    .then((snapshot) => {
      response = snapshot.val().conversation;
    });
  return response;
}

export async function getLatestMessages(conversationId) {
  let list = [];

  await firebase
    .database()
    .ref(`conversation/${conversationId}`)
    .orderByKey()
    .limitToLast(10)
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        list.push({
          key: childSnapshot.key, ...childSnapshot.val()
        });
      });
    });

  return list;
}

export async function getMoreMessages(request) {
  let list = [];
  let ban = 0;
  let length;

  await firebase
    .database()
    .ref(`conversation/${request.conversationId}`)
    .orderByKey()
    .endAt(request.key)
    .limitToLast(10)
    .once('value', (snapshot) => {
      length = snapshot.numChildren();
      snapshot.forEach((childSnapshot) => {
        if (ban !== length - 1) {
          const result = {
            key: childSnapshot.key,
            message: childSnapshot.val().message,
            uid: childSnapshot.val().uid
          };
          list.push(result);
        }
        ban += 1;
      });
    });
  return list;
}

export async function sendMessage(request) {
  const root = firebase.database().ref();
  let updateObject = {};
  let response = {}; 
  updateObject[`conversation/${request.id}/${request.time}/message`] = request.message;
  updateObject[`conversation/${request.id}/${request.time}/uid`] = request.transmitter;
  updateObject[`chat/${request.transmitter}/${request.receiver}/last_message`] = request.message;
  updateObject[`chat/${request.receiver}/${request.transmitter}/last_message`] = request.message;

  const error = await root.update(updateObject);

  if (error) {
    response.error = error;
  }

  return response;
}

export async function getConversationRef(data) {
  let id;
  await firebase
    .database()
    .ref(`chat/${data.receiver}/${data.transmitter}/conversation`)
    .once('value', (snapshot) => {
      id = snapshot.val();
    });

  return firebase.database().ref(`conversation/${id}`);
}

export async function getUsernameByUid(uid) {
  let username;
  await firebase
    .database()
    .ref()
    .child('usernames')
    .orderByKey()
    .equalTo(uid)
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        username = childSnapshot.key;
      });
    });

  return username;
}
