import * as firebase from "firebase";

export async function saveSignature(request) {
  var root = firebase.database().ref();
  var response = {};
  let updateObject = {};

  updateObject["order_tracking/" + request.order_id + "/signature"] = request.signature;
  const error_insert_order = await root.update(updateObject);

  if (error_insert_order) {
    response["error"] = error_insert_order;
  } else {
    response["error"] = null;
  }

  return response;
}

