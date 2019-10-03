const MOTORCYCLE = 'motorcycle';
const CAR = 'car';
const UTILITARY = 'utilitary';
const CAMIOCHIC = 'camiochic';
const CAMIOGDE = 'camiogde';
const CAMIONCHIC = 'camionchic';
const CAMIONGDE = 'camiongde';

export function getVehicleTypeValue(vehicleType) {
  let value;
  switch (vehicleType) {
    case MOTORCYCLE:
      value = 1;
      break;
    case CAR:
      value = 2;
      break;
    case UTILITARY:
      value = 3;
      break;
    case CAMIOCHIC:
      value = 4;
      break;
    case CAMIOGDE:
      value = 5;
      break;
    case CAMIONCHIC:
      value = 6;
      break;
    case CAMIONGDE:
      value = 7;
      break;
    default:
      break;
  }
  return value;
}

export function getVehicleTypeText(vehicleType) {
  let value;
  switch (vehicleType) {
    case MOTORCYCLE:
      value = 'Moto';
      break;
    case CAR:
      value = 'Auto';
      break;
    case UTILITARY:
      value = 'Utilitario';
      break;
    case CAMIOCHIC:
      value = 'Camioneta chica';
      break;
    case CAMIOGDE:
      value = 'Camioneta grande';
      break;
    case CAMIONCHIC:
      value = 'Camión chico';
      break;
    case CAMIONGDE:
      value = 'Camión grande';
      break;
    default:
      break;
  }
  return value;
}


export const VEHICLES = [
  { key: 'motorcycle', description: 'Moto', capacity: '10', icon: require('../assets/images/moto_icono.png') },
  { key: 'car', description: 'Auto', capacity: '100', icon: require('../assets/images/auto_icono.png') },
  { key: 'utilitary', description: 'Utilitario', capacity: '500', icon: require('../assets/images/kangoo_icono.png') },
  {
    key: 'camiochic',
    description: 'Camioneta Chica',
    capacity: '1000',
    icon: require('../assets/images/trafic1_icono.png')
  },
  {
    key: 'camiogde',
    description: 'Camioneta Grande',
    capacity: '2000',
    icon: require('../assets/images/trafic2_icono.png')
  },
  {
    key: 'camionchic',
    description: 'Camión Chico',
    capacity: '5000', 
    icon: require('../assets/images/camioneta_icono.png')
  },
  {
    key: 'camiongde',
    description: 'Camión Grande',
    capacity: '10000', 
    icon: require('../assets/images/camion_icono.png')
  }
]