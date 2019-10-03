import { ActionsTypes } from '../actions';

const initialState = {
  notifications: [],
  isFetchingNotifications: false
};

export default function notificationsReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case ActionsTypes.NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetchingNotifications: true,
        notifications: []
      };
    case ActionsTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: addNotificationAndSort(state.notifications, action.notification)
      };
    case ActionsTypes.UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: updateNotifications(
          state.notifications,
          action.notification
        )
      };
    case ActionsTypes.DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: removeNotification(
          state.notifications,
          action.notification
        )
      };
    case ActionsTypes.NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetchingNotifications: false
      };
    default:
      return state;
  }
}

function updateNotifications(array, notification) {
  return array.map((item, index) => {
    if (item.payload.key !== notification.payload.key) {
      return item;
    }

    return {
      ...item,
      ...notification
    };
  });
}

function addNotificationAndSort(notifications, notification) {
  return notifications.concat(notification).sort(function(x, y){
    return new Date(y.payload.params.timestamp) - new Date(x.payload.params.timestamp);;
  });
}

function removeNotification(array, key) {
  return array.filter(function (notification) {
    return notification.payload.key !== key;
  });
}
