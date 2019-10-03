import { ActionsTypes } from '../actions';
import { ORDER_STATUS_CLOSED, ORDER_STATUS_CANCELLED } from '../../../utils/constants/orders';

export const MY_ORDERS_REQUEST = 'MY_ORDERS_REQUEST';
export const MY_ORDERS_SUCCESS = 'MY_ORDERS_SUCCESS';
export const ADD_RESULT = 'ADD_RESULT';
export const UPDATE_RESULT = 'UPDATE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';
export const MY_ORDERS_ERROR = 'MY_ORDERS_ERROR';
export const FILTER_VIEW_ORDER = 'FILTER_VIEW_ORDER';
export const NAVIGATION_REPUTATION_ORDERS = 'ReputationOrders';
export const NAVIGATION_ORDER_TRACKING_ORDERS = 'OrderTrackingOrders';
export const NAVIGATION_ORDER_DETAIL = 'OrderDetail';
export const NAVIGATION_USER_PROFILE_ORDERS = 'UserProfileOrders';
export const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';

const initialState = {
  orders: [],
  ordersFiltered: [],
  isFetching: false,
  selectedIndex: 0
};

export default function myOrdersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionsTypes.ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        orders: []
      };
    case ActionsTypes.ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case ActionsTypes.ADD_ORDER:
      return {
        ...state,
        orders: state.orders.concat(action.order),
        isFetching: false,
        ordersFiltered: filterOrderStatus(state.orders.concat(action.order), state.selectedIndex)
      };
    case ActionsTypes.FILTER_VIEW_ORDER:
      return {
        ...state,
        ordersFiltered: filterOrderStatus(state.orders, action.index),
        selectedIndex: action.index
      };
    case ActionsTypes.DELETE_ORDER:
      return {
        ...state,
        orders: remove(state.orders, action.key),
        ordersFiltered: remove(state.orders, action.key)
      };
    case ActionsTypes.UPDATE_ORDER:
      return {
        ...state,
        orders: update(state.orders, action.order),
        ordersFiltered: filterOrderStatus(update(state.orders, action.order), state.selectedIndex)
      };
    default:
      return state;
  }
}

function filterOrderStatus(array, selectedIndex) {
  const orders_filtered = array.filter((order) => {
    if (selectedIndex === 1) {
      return order.status === ORDER_STATUS_CLOSED || order.status === ORDER_STATUS_CANCELLED;
    }
    if (selectedIndex === 0) {
      return order.status !== ORDER_STATUS_CLOSED && order.status !== ORDER_STATUS_CANCELLED;
    }
  });
  return orders_filtered.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
}

function remove(array, id) {
  return array.filter((order) => order.id !== id);
}

function update(array, result) {
  return array.map((item) => {
    if (item.id !== result.id) {
      return item;
    }

    return {
      ...result
    };
  });
}
