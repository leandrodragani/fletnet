import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { CheckBoxContainer, CheckBoxText } from './styles';

export const UsertypeCheckBox = (props) => {
  const {
    title,
    onPress,
    checked,
    checkedIcon,
    uncheckedIcon,
    checkedIconColor,
    uncheckedIconColor
  } = props;

  return (
    <CheckBoxContainer onPress={onPress}>
      {checked ? (
        <FontAwesome name={checkedIcon} size={20} color={checkedIconColor} />
      ) : (
        <FontAwesome name={uncheckedIcon} size={20} color={uncheckedIconColor} />
      )}
      <CheckBoxText checked>{title}</CheckBoxText>
    </CheckBoxContainer>
  );
};
