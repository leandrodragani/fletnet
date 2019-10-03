import React from 'react';
import { ListItem } from 'react-native-elements';
import { UserImage } from './styles';

export const UserRated = (props) => {
  const { id, title, subtitle, image } = props;
  return (
    <ListItem
      leftAvatar={(
        <UserImage
          resizeMethod="resize"
          source={image}
        />
      )}
      key={id}
      title={title}
      subtitle={subtitle}
      hideChevron
      containerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'transparent'
      }}
      titleStyle={{
        fontWeight: '600',
        fontSize: 16,
        color: '#454F63',
        marginBottom: 8
      }}
      subtitleStyle={{
        fontSize: 14,
        color: '#78849E'
      }}
      avatarContainerStyle={{ margin: 10 }}
    />
  );
};
