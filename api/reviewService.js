import * as firebase from "firebase";
import { URL_API_MAILGUN } from '../utils/api-url';
const SEND_EMAIL_REVIEW_URL = 'email/review';

export async function requestReview(data) {
  var user;
  await firebase
    .database()
    .ref("users/" + data.uid)
    .once("value", function (snapshot) {
      user = snapshot.val();
    });

  return user;
}

export async function sendReview(data) {
  /*  var database = firebase.database();
 
   database.ref("review/"+data.user).set({
     message: data.message,
   });
*/
  const json = {
    from_user_email: data.email,
    user_review: data.message
  }

 return fetch(URL_API_MAILGUN + SEND_EMAIL_REVIEW_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  }).then(function (res) {
    return res;
  })
    .catch((error) => {
      console.log(error);
      return error;
    });
}