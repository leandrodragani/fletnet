import { ActionsTypes } from '../actions';

const initialState = {
  isFetchingMore: false,
  isFetching: false,
  orders: [],
  carriers: [],
  radius: 0.1,
  location: [],
  isRadiusCardVisible: false,
  isAddOrderVisible: true
};

export default function homeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.HOME_ORDERS_REQUEST:
      return {
        ...state,
        location: action.request.location,
        orders: [],
        isRadiusCardVisible: true,
        isFetching: true
      };
    case ActionsTypes.HOME_CARRIERS_REQUEST:
      return {
        ...state,
        location: action.request.location,
        radius: action.request.radius,
        carriers: [],
        isRadiusCardVisible: true,
        isFetching: true
      };
    case ActionsTypes.ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case ActionsTypes.SET_FETCHING_LOCATION:
      return {
        ...state,
        isFetching: true
      };
    case ActionsTypes.CARRIERS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case ActionsTypes.REQUEST_MORE_ORDERS:
      return {
        ...state,
        isFetchingMore: true,
      };
    case ActionsTypes.REQUEST_MORE_CARRIERS:
      return {
        ...state,
        isFetchingMore: true,
      };
    case ActionsTypes.MORE_ORDERS_SUCCESS:
      return {
        ...state,
        isFetchingMore: false,
        radius: action.response.radius,
        isFetching: false
      };
    case ActionsTypes.MORE_CARRIERS_SUCCESS:
      return {
        ...state,
        isFetchingMore: false,
        radius: action.response.radius,
        isFetching: false
      };
    case ActionsTypes.ADD_ORDER:
      return {
        ...state,
        orders: addOrder(state.orders, action.order)
      };
    case ActionsTypes.REMOVE_ORDER:
      return {
        ...state,
        orders: removeOrder(state.orders, action.key)
      };
    case ActionsTypes.ADD_CARRIER:
      return {
        ...state,
        carriers: addCarrier(state.carriers, action.carrier)
      };
    case ActionsTypes.REMOVE_CARRIER:
      return {
        ...state,
        carriers: removeCarrier(state.carriers, action.key)
      };
    case ActionsTypes.APPLY_FILTER:
      return {
        ...state,
        orders: [],
        carriers: [],
        isFetching: true
      };
    case ActionsTypes.CLEAR_FILTER:
      return {
        ...state,
        orders: [],
        carriers: [],
        location: state.actualLocation,
        isFetching: true
      };
    default:
      return state;
  }
}

function addOrder(orders, order) {
  return orders.concat(order).sort((a, b) => {
    if (a.distance > b.distance) {
      return 1;
    }
    if (a.distance < b.distance) {
      return -1;
    }
    return 0;
  });
}

function removeOrder(orders, key) {
  return orders
    .filter(order => order.id !== key)
    .sort((a, b) => {
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
}

function addCarrier(carriers, carrier) {
  return carriers.concat(carrier).sort((a, b) => {
    if (a.distance > b.distance) {
      return 1;
    }
    if (a.distance < b.distance) {
      return -1;
    }
    return 0;
  });
}

function removeCarrier(carriers, key) {
  return carriers
    .filter(carrier => carrier.uid !== key)
    .sort((a, b) => {
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
}
