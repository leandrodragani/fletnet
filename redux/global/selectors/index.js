const userTypeSelector = state => state.globalReducer.user.type;
const userEmailSelector = state => state.globalReducer.user.email;
const userFullnameSelector = state => state.globalReducer.user.fullname;
const userPushNotificationTokenSelector = state => state.globalReducer.user.push_notification_token;
const userUidSelector = state => state.globalReducer.user.uid;
const userUriImgSelector = state => state.globalReducer.user.uri_img;
const userUsernameSelector = state => state.globalReducer.user.username;
const authListenerSelector = state => state.globalReducer.auth_listener;

export const Selectors = {
  userTypeSelector,
  userEmailSelector,
  userFullnameSelector,
  userPushNotificationTokenSelector,
  userUidSelector,
  userUriImgSelector,
  userUsernameSelector,
  authListenerSelector
};
