import React from 'react';
import { ListItem } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { LanguageHelper } from "../../../../utils/helpers/language";

export const NotificationItem = (props) => {
  const { id, title, subtitle, icon, read, onPress, date } = props;
  return (
    <ListItem
      onPress={onPress}
      leftIcon={icon}
      key={id}
      title={title}
      subtitle={subtitle}
      hideChevron
      containerStyle={{
        paddingVertical: 15,
      }}
      titleStyle={{
        fontWeight: read ? 'normal' : '700',
        fontSize: 16,
        color: read ? '#78849E' : '#454F63',
        marginBottom: 5
      }}
      subtitleStyle={{
        fontWeight: read ? '200' : '600',
        fontSize: 14,
        color: read ? '#959DAD' : '#78849E'
      }}
      rightTitleStyle={{
        fontWeight: '100',
        color: '#78849E',
        fontSize: 12
      }}
      rightTitle={date}
      avatarContainerStyle={{ margin: 10 }}
    />
  );
};
