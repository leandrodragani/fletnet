import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  LoginButtonTouchable,
  LoginButtonText
} from './styles';

export const LoginButton = (props) => {
  const { loading, onPress } = props;
  return (
    <LoginButtonTouchable onPress={onPress}>
      {loading && <ActivityIndicator color="white" />}
      <LoginButtonText loading={loading} disabled={loading}>Iniciar sesión</LoginButtonText>
    </LoginButtonTouchable>
  );
};
