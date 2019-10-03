import { makeActionCreator } from '../../../utils/helpers/redux';

const NOTIFICATIONS_REQUEST = "notifications/LATEST_NOTIFICATIONS_REQUEST";
const NOTIFICATIONS_SUCCESS = "notifications/LATEST_NOTIFICATIONS_SUCCESS";
const ADD_NOTIFICATION = "notifications/ADD_NOTIFICATION";
const UPDATE_NOTIFICATION = "notifications/UPDATE_NOTIFICATION";
const DELETE_NOTIFICATION = "notifications/DELETE_NOTIFICATION";
const TOGGLE_READ_NOTIFICATION = "notifications/TOGGLE_READ_NOTIFICATION";

export const notificationsRequest = makeActionCreator(NOTIFICATIONS_REQUEST, 'request');
export const notificationsSuccess = makeActionCreator(NOTIFICATIONS_SUCCESS, 'response');
export const addNotification = makeActionCreator(ADD_NOTIFICATION, 'notification');
export const updateNotification = makeActionCreator(UPDATE_NOTIFICATION, 'notification');
export const deleteNotification = makeActionCreator(DELETE_NOTIFICATION, 'notification');
export const toggleReadNotification = makeActionCreator(TOGGLE_READ_NOTIFICATION, 'request');

export const ActionsTypes = {
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_SUCCESS,
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  TOGGLE_READ_NOTIFICATION
};

export const Actions = {
  notificationsRequest,
  notificationsSuccess,
  addNotification,
  updateNotification,
  deleteNotification,
  toggleReadNotification
};
