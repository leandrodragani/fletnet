import React from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

export const AddOrderItem = props => (
  <ListItem
    subtitleStyle={{ fontSize: 12, fontWeight: 'normal', color: '#959DAD', marginTop: 3 }}
    titleStyle={{ fontSize: 14, fontWeight: '600', color: '#454F63' }}
    Component={TouchableOpacity}
    containerStyle={{
      backgroundColor: 'transparent',
      marginVertical: 5
    }}
    {...props}
  />
);
