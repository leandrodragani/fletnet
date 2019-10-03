import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { CarrierTabNavigator, ClientTabNavigator } from './MainTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import AuthLoading from '../features/auth-loading';

export default createAppContainer(
  createSwitchNavigator(
    {
      CarrierTabNavigator,
      ClientTabNavigator,
      Auth: AuthStackNavigator,
      AuthLoading
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
