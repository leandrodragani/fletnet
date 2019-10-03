import React from 'react';
import { AvoidingView } from './styles';

export const KeyboardAvoidingView = (props) => {
  const { children } = props;
  return <AvoidingView>{children}</AvoidingView>;
};
