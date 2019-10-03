import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AddOrder from '../features/add-order';
import MyHome from '../features/home';
import Review from '../features/review';
import Signature from '../features/signature';
import Profile from '../features/profile';
import EditProfile from '../features/edit-profile';
import Help from '../features/help';
import Orders from '../features/orders';
import Notifications from '../features/notifications';
import Chat from '../features/chat';
import Messages from '../features/messages';
import Rate from '../features/rate';
import OrderDetail from '../features/order-detail';
import OrderTracking from '../features/order-tracking';
import Payment from '../features/payment';
import OrderCancel from '../features/order-cancel';
import Reputation from '../features/reputation';
import AnswerQuestion from '../features/answer-question';

const HomeStack = createStackNavigator(
  {
    MyHome,
    OrderDetail,
    OrderCancel,
    OrderTracking,
    Signature,
    AnswerQuestion,
    Reputation,
    Chat
  },
  {
    initialRouteName: 'MyHome'
  }
);

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon focused={focused} name="md-home" color={tintColor} />
  )
};

const OrderStack = createStackNavigator(
  {
    Orders,
    Signature,
    OrderDetail,
    ...AddOrder,
    OrderTracking,
    Rate,
    Payment,
    OrderCancel,
    AnswerQuestion,
    Reputation,
    Chat
  },
  {
    initialRouteName: 'Orders'
  }
);

OrderStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon focused={focused} name="ios-archive" color={tintColor} />
  )
};

const ProfileStack = createStackNavigator(
  {
    Profile,
    EditProfile,
    Review,
    Help,
    Rate,
    Reputation
  },
  {
    initialRouteName: 'Profile'
  }
);

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon focused={focused} name="md-person" color={tintColor} />
  )
};

const NotificationStack = createStackNavigator(
  {
    Notifications,
    Chat,
    Messages,
    OrderTracking,
    OrderDetail,
    OrderCancel,
    Profile,
    Rate,
    Reputation
  },
  {
    initialRouteName: 'Notifications'
  }
);

NotificationStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon focused={focused} name="md-notifications" color={tintColor} />
  )
};

export const CarrierTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    OrderStack,
    NotificationStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#665EFF',
      inactiveTintColor: '#959DAD'
    }
  }
);

export const ClientTabNavigator = createBottomTabNavigator(
  {
    OrderStack,
    NotificationStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#665EFF',
      inactiveTintColor: '#959DAD'
    }
  }
);
