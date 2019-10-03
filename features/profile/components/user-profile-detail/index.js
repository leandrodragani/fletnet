import React from 'react';
import { Icon } from 'expo';
import {
  UserProfileContainer,
  RegisterDateText,
  UsernameText,
  UserProfileTouchable,
  UserProfileImage,
  UserProfileInfoTextContainer,
  EditTouchable
} from './styles';

export const UserProfileDetail = (props) => {
  const { username, registerDate, image, onPress } = props;
  return (
    <UserProfileContainer>
      <UserProfileTouchable onPress={onPress}>
        <UserProfileImage source={image} resizeMethod="resize" />
      </UserProfileTouchable>
      <UserProfileInfoTextContainer>
        <UsernameText>{username}</UsernameText>
        <RegisterDateText>{registerDate}</RegisterDateText>
      </UserProfileInfoTextContainer>
      <EditTouchable onPress={onPress}>
        <Icon.FontAwesome name="pencil" size={20} color="#FFFFFF" accessibilityLabel="fontAwesomePencil" />
      </EditTouchable>
    </UserProfileContainer>
  );
};
