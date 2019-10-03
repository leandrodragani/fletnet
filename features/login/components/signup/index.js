import React from 'react';
import { SignUpContainer, SignUpText, SignUpTextBold } from './styles';

export const SignUpNav = props => (
  <SignUpContainer {...props}>
    <SignUpText>
      ¿No tenés cuenta?
      {' '}
      <SignUpTextBold {...props}>Registrate</SignUpTextBold>
    </SignUpText>
  </SignUpContainer>
);
