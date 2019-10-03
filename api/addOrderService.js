import firebase from 'firebase';
import { GeoFire } from 'geofire';
import { GOOGLE_MAPS_API_KEY } from '../utils/constants/keys';

export async function getPolyline(o, d) {
  const mode = 'driving';
  const origin = `${o.latitude},${o.longitude}`;
  const destination = `${d.latitude},${d.longitude}`;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}&mode=${mode}`;

  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson)
    .catch((e) => {
      console.warn(e);
    });
}

export async function insertOrder(request) {
  const root = firebase.database().ref();
  let response = {};
  const orderKey = root.child('orders').push().key;

  let updateObject = {};
  const date = new Date();
  if (request.orderDate === '') {
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    request.orderDate = `${date.getDate()}/${month}/${date.getFullYear()}`;
  }

  if (request.sinceTime === '') {
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    request.sinceTime = `${date.getHours()}:${minutes}`;
  }

  updateObject[`orders/${orderKey}/title`] = request.title;
  updateObject[`orders/${orderKey}/origin`] = request.origin;
  updateObject[`orders/${orderKey}/destination`] = request.destination;
  updateObject[`orders/${orderKey}/uid`] = request.uid;
  updateObject[`orders/${orderKey}/assistant`] = request.assistant;
  updateObject[`orders/${orderKey}/since_time`] = request.sinceTime;
  updateObject[`orders/${orderKey}/until_time`] = request.untilTime;
  updateObject[`orders/${orderKey}/order_date`] = request.orderDate;
  updateObject[`orders/${orderKey}/create_date`] = request.create_date;
  updateObject[`orders/${orderKey}/withReturn`] = request.withReturn;
  updateObject[`orders/${orderKey}/vehicleType`] = request.vehicleType;
  updateObject[`orders/${orderKey}/value`] = request.orderValue;
  updateObject[`orders/${orderKey}/type`] = request.type;
  updateObject[`orders/${orderKey}/polyline`] = request.polyline;
  updateObject[`orders/${orderKey}/distance`] = request.distance;
  updateObject[`orders/${orderKey}/duration`] = request.duration;
  updateObject[`orders/${orderKey}/payment_method`] = request.paymentMethod;
  updateObject[`users_orders/${request.uid}/${orderKey}/status`] = 'PENDING';

  const errorInsertOrder = await root.update(updateObject);

  if (errorInsertOrder) {
    response.error = errorInsertOrder;
    response.order_key = orderKey;
  } else {
    request.keyOrder = orderKey;

    const errorIndexLocation = await indexOrderLocation(request);

    if (errorIndexLocation) {
      response.error = errorIndexLocation;
      response.order_key = orderKey;
    } else {
      response.order_key = orderKey;
      response.error = null;
    }
  }

  return response;
}

export async function indexOrderLocation(order) {
  const database = firebase.database();
  const geoFire = new GeoFire(database.ref('/orders_locations/'));
  return geoFire.set(order.keyOrder, [
    order.origin.coordinates.latitude,
    order.origin.coordinates.longitude
  ]);
}

export async function getSomeNearbyCarriers(order) {
  const database = firebase.database();
  const geoFire = new GeoFire(database.ref('/carriers_locations/'));

  const geoQuery = geoFire.query({
    center: [order.origin.coordinates.latitude, order.origin.coordinates.longitude],
    radius: 20
  });

  return geoQuery;
}

export async function insertOrderDistribution(request) {
  const root = firebase.database().ref();
  let response = {};
  const orderKey = root.child('orders').push().key;

  let updateObject = {};
  const date = new Date();
  if (request.orderDate === '') {
    const month = date.getMonth() + 1;
    request.orderDate = `${date.getDate()}/${month}/${date.getFullYear()}`;
  }

  if (request.sinceTime === '') {
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    request.sinceTime = `${date.getHours()}:${minutes}`;
  }

  updateObject[`orders/${orderKey}/title`] = request.title;
  updateObject[`orders/${orderKey}/description`] = `Desde ${
    request.origin.description.split(',')[0]
  }`;
  updateObject[`orders/${orderKey}/origin`] = request.origin;
  updateObject[`orders/${orderKey}/uid`] = request.uid;
  updateObject[`orders/${orderKey}/assistant`] = request.assistant;
  updateObject[`orders/${orderKey}/since_time`] = request.sinceTime;
  updateObject[`orders/${orderKey}/until_time`] = request.untilTime;
  updateObject[`orders/${orderKey}/order_date`] = request.orderDate;
  updateObject[`orders/${orderKey}/create_date`] = request.create_date;
  updateObject[`orders/${orderKey}/withReturn`] = request.withReturn;
  updateObject[`orders/${orderKey}/vehicleType`] = request.vehicleType;
  updateObject[`orders/${orderKey}/value`] = request.orderValue;
  updateObject[`orders/${orderKey}/type`] = 'distribution';
  updateObject[`orders/${orderKey}/waypoints`] = request.waypoints;
  updateObject[`orders/${orderKey}/polyline`] = request.polyline;
  updateObject[`orders/${orderKey}/distance`] = request.distance;
  updateObject[`orders/${orderKey}/duration`] = request.duration;
  updateObject[`orders/${orderKey}/payment_method`] = request.paymentMethod;
  updateObject[`users_orders/${request.uid}/${orderKey}/status`] = 'PENDING';

  const errorInsertOrder = await root.update(updateObject);

  if (errorInsertOrder) {
    response.error = errorInsertOrder;
    response.order_key = orderKey;
  } else {
    request.keyOrder = orderKey;

    const errorIndexLocation = await indexOrderLocation(request);

    if (errorIndexLocation) {
      response.error = errorIndexLocation;
      response.order_key = orderKey;
    } else {
      response.order_key = orderKey;
      response.error = null;
    }
  }

  return response;
}

export async function getMinPrice(vehicleType) {
  let price = 0;

  await firebase
    .database()
    .ref(`travel_price/${vehicleType}`)
    .once('value', (snapshot) => {
      price = snapshot.val();
    });

  return price;
}

export async function getOptimizedRoadmap(o, d, locations) {
  const mode = 'driving';
  const origin = `${o.latitude},${o.longitude}`;
  const destination = `${d.latitude},${d.longitude}`;
  const APIKEY = 'AIzaSyBW5D1IFR4q5PWD3j-MSIBy6dhd0VP4aPE';
  let waypoints = 'optimize:true|';

  locations.forEach((element) => {
    waypoints += `via:${element.coordinates.latitude},${element.coordinates.longitude}|`;
  });

  waypoints = waypoints.slice(0, -1);

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${APIKEY}&mode=${mode}`;

  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((e) => {
      console.warn(e);
    });
}
