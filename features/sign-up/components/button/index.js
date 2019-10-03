import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  SignUpButtonTouchable,
  SignUpButtonText
} from './styles';
import { LanguageHelper } from '../../../../utils/helpers/language';

export const SignUpButton = (props) => {
  const { loading, onPress } = props;
  return (
    <SignUpButtonTouchable onPress={onPress}>
      {loading && <ActivityIndicator color="white" />}
      <SignUpButtonText loading={loading} disabled={loading}>{LanguageHelper.getLanguage().sign_up_button}</SignUpButtonText>
    </SignUpButtonTouchable>
  );
};
