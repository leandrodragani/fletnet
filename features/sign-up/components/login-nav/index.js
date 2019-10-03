import React from 'react';
import { LoginNavContainer, LoginNavText, LoginNavTextBold } from './styles';
import { LanguageHelper } from '../../../../utils/helpers/language';

export const LoginNav = props => (
  <LoginNavContainer {...props}>
    <LoginNavText>
      {LanguageHelper.getLanguage().login_nav_text}
      {' '}
      <LoginNavTextBold {...props}>{LanguageHelper.getLanguage().login_nav_text_bold}</LoginNavTextBold>
    </LoginNavText>
  </LoginNavContainer>
);
