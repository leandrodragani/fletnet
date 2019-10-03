import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';
import { store } from '../redux/store';

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();

  const uid = store.getState().globalReducer.user.uid;
  if (uid != null) {
    const updates = {};
    updates['/push_notification_token'] = token;
    firebase
      .database()
      .ref(`users/${uid}`)
      .update(updates);
  }

  console.log(`Token: ${token}`);
}

export async function getTokenPushNotificationUser(user) {
  let token;
  await firebase
    .database()
    .ref(`users/${user}`)
    .once('value', (snapshot) => {
      token = snapshot.val().push_notification_token;
    });
  return token;
}

export async function sendPushNotification(request) {
  savePushNotification({
    uid: request.uid,
    data: request.body.data
  });

  return fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request.body)
  })
    .then(response => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export async function savePushNotification(notification) {
  notification.data.timestamp = Date.now();

  return await firebase
    .database()
    .ref(`notifications/${notification.uid}`)
    .push(notification.data);
}

export async function getNotifications(uid) {
  let notifications = [];

  await firebase
    .database()
    .ref(`notifications/${uid}`)
    .limitToFirst(10)
    .orderByChild('timestamp')
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const notification = childSnapshot.val();
        notification.key = childSnapshot.key;
        notifications.push(notification);
      });
    });

  return notifications.reverse();
}

export async function getNotificationsRef(uid) {
  return await firebase
    .database()
    .ref(`notifications/${uid}`);
}

export async function toggleReadNotification(request) {
  let updates = {};
  updates['/read'] = true;

  await firebase
    .database()
    .ref(`notifications/${request.uid}/${request.notificationKey}`)
    .update(updates);
}

export async function deleteNotification(request) {
  return await firebase
    .database()
    .ref(`notifications/${request.uid}/${request.notification_id}`)
    .update(null);
}
