import * as firebase from 'firebase';

export async function getVehicleBrands(vehicle_type) {
  let vehicleBrands = [];
  await firebase
    .database()
    .ref('vehicle_brands')
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        switch (vehicle_type) {
          case 'motorcycle':
          case 'car':
            if (String(childSnapshot.val().vehicle_type) === String(vehicle_type)) {
              vehicleBrands.push(childSnapshot.val());
            }
            break;
          case 'utilitary':
          case 'camiochic':
          case 'camiogde':
            if (String(childSnapshot.val().vehicle_type) != String('motorcycle')) {
              vehicleBrands.push(childSnapshot.val());
            }
            break;
          case 'camionchic':
          case 'camiongde':
            if (String(childSnapshot.val().vehicle_type) === String('truck')) {
              vehicleBrands.push(childSnapshot.val());
            }
            break;
          default:
            break;
        }
      });
    });
  return vehicleBrands;
}

export async function getVehicleModels(idBrand) {
  let vehicleModels = [];
  await firebase
    .database()
    .ref('vehicle_models')
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (String(childSnapshot.val().id_marca) === String(idBrand)) {
          vehicleModels.push(childSnapshot.val());
        }
      });
    });
  return vehicleModels;
}

export async function saveVehicleDetail(vehicle) {
  await firebase
    .database()
    .ref(`users/${vehicle.uid}/vehicle`)
    .set({
      model: vehicle.model,
      tara: vehicle.tara,
      license_plate: vehicle.license_plate,
      brand: vehicle.brand,
      type: vehicle.type,
      validate: vehicle.validate,
      uri_vehicle: vehicle.uri_vehicle
    });
}
