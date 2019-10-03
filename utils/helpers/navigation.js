import { NavigationActions, StackActions } from 'react-navigation';

const config = {};

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export function navigate(routeName, params) {
  if (validate(routeName)) {
    const action = NavigationActions.navigate({ routeName, params });
    dispatch(action);
  }
}

export function push(routeName, params) {
  if (validate(routeName)) {
    const action = StackActions.push({ routeName, params });
    dispatch(action);
  }
}

export function goBack() {
  if (config.navigator) {
    const action = NavigationActions.back({});
    dispatch(action);
  }
}

function dispatch(action) {
  config.navigator.dispatch(action);
}

function validate(routeName) {
  return config.navigator && routeName;
}
