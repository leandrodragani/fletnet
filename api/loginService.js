import * as firebase from 'firebase';
import { BackHandler } from 'react-native';
import { store } from '../redux/store';
import * as NavigationHelper from '../utils/helpers/navigation';

export async function login(user, pass) {
  const credential = firebase.auth.EmailAuthProvider.credential(user, pass);
  const response = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

  return response;
}

export async function getUser(userId) {
  let user;
  await firebase
    .database()
    .ref(`users/${userId}`)
    .once('value', (snapshot) => {
      if (snapshot.exists()) {
        user = snapshot.val();
        user.uid = snapshot.key;
      }
    });
  return user;
}

export function userSignOut() {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const unsuscribeAuth = store.getState().globalReducer.auth_listener;
      unsuscribeAuth();
      BackHandler.removeEventListener('hardwareBackPress', () => {
        NavigationHelper.navigate.goBack();
      });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

export async function loginWithGoogle(request) {
  const credential = firebase.auth.GoogleAuthProvider.credential(request.idToken);
  const response = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
  return response;
}
