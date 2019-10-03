import * as firebase from 'firebase';
import { ORDER_STATUS_CLOSED } from '../utils/constants/orders';

export async function userVoteReputation(request) {
  const root = firebase.database().ref();
  var response = {};
  const rateKey = root.child('users_reputation/' + request.user_rated_uid + '/' + request.order_uid)
    .key;

  let updateObject = {};

  updateObject['users_reputation/' + request.user_rated_uid + '/' + rateKey + '/rating'] =
    request.rating;
  updateObject['users_reputation/' + request.user_rated_uid + '/' + rateKey + '/message'] =
    request.message;
  updateObject['users_reputation/' + request.user_rated_uid + '/' + rateKey + '/user_uid'] =
    request.user_uid;
  updateObject['users_reputation/' + request.user_rated_uid + '/' + rateKey + '/username'] =
    request.username;
  updateObject['users_reputation/' + request.user_rated_uid + '/' + rateKey + '/create_date'] =
    request.create_date;

  updateObject[
    'users_orders/' + request.user_uid + '/' + request.order_uid + '/status'
  ] = ORDER_STATUS_CLOSED;

  const error_insert_vote = await root.update(updateObject);

  if (error_insert_vote) {
    response['error'] = error_insert_vote;
    response['vote_key'] = voteKey;
  }

  return response;
}
