import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  ButtonTouchable,
  ButtonText
} from './styles';

export const Button = (props) => {
  const { loading, onPress, title, width, height, color, disabled } = props;
  return (
    <ButtonTouchable disabled={disabled || loading} width={width} height={height} radius onPress={onPress} color={color}>
      {loading && <ActivityIndicator color="white" />}
      <ButtonText loading={loading} disabled={loading}>{title}</ButtonText>
    </ButtonTouchable>
  );
};
