import React from 'react';
import { CaptionText } from './styles';

export const ForgotPasswordCaption = (props) => {
  const { children } = props;
  return (
    <CaptionText>
      {children}
    </CaptionText>
  );
};
