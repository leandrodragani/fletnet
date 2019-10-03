import firebase from 'firebase';
import { GeoFire } from 'geofire';

export async function getOrderGeoQuery(position, radius) {
  try {
    const database = firebase.database();
    const geoFire = new GeoFire(database.ref('/orders_locations/'));
    return await geoFire.query({
      center: [position.latitude, position.longitude],
      radius
    });
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getCarrierGeoQuery(position, radius) {
  try {
    const database = firebase.database();
    const geoFire = new GeoFire(database.ref('/carriers_locations/'));
    return await geoFire.query({
      center: [position.latitude, position.longitude],
      radius
    });
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function indexCarrierLocation(carrier) {
  const database = firebase.database();
  const geoFire = new GeoFire(database.ref('/carriers_locations/'));
  geoFire.set(carrier.uid, [carrier.coords.latitude, carrier.coords.longitude]);
}
