import React from 'react';
import { ListItem } from 'react-native-elements';
import { UserImage } from './styles';

export const ConversationItem = (props) => {
  const { uid, username, onPress, lastMessage, uriIMG } = props;
  return (
    <ListItem
      title={username}
      subtitle={lastMessage}
      leftAvatar={(
        <UserImage
          // source={item.uri_img != "" ? { uri: item.uri_img } : this.props.user.usertype == USERTYPE_CLIENT ? require("../../../../assets/images/icono_default_fletero.png") : require("../../../../assets/images/icono_default_fletero_2.png")}
          resizeMethod="resize"
          source={uriIMG == "" ? require('../../../../assets/images/user_profile.png') : { uri: uriIMG }}
        />
      )}
      key={uid}
      containerStyle={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: 'white',
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
      onPress={onPress}
    />
  );
};
