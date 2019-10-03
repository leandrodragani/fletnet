import React from 'react';
import { ForgotPasswordText, ForgotPasswordTextBold, ForgotPasswordContainer } from './styles';
import { LanguageHelper } from '../../../../utils/helpers/language';

export const ForgotPasswordNav = props => (
  <ForgotPasswordContainer>
    <ForgotPasswordText {...props}>
      {LanguageHelper.getLanguage().forgot_password_login_text}
      {' '}
      <ForgotPasswordTextBold>{LanguageHelper.getLanguage().forgot_password_login_text_bold}</ForgotPasswordTextBold>
    </ForgotPasswordText>
  </ForgotPasswordContainer>
);
