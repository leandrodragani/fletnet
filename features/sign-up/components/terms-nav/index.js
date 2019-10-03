import React from 'react';
import {
  TermsNavContainer,
  TermsNavText,
  TermsNavTextBold,
  TermsNavCompanyName
} from './styles';
import { LanguageHelper } from '../../../../utils/helpers/language';

export const TermsNav = (props) => {
  const { onPress, companyName } = props;
  return (
    <TermsNavContainer onPress={onPress}>
      <TermsNavText>
        {LanguageHelper.getLanguage().terms_nav_text}
        {'\n'}
        <TermsNavTextBold onPress={onPress}>
        {LanguageHelper.getLanguage().terms_nav_text_bold}
        </TermsNavTextBold>
        {'\n'}
        <TermsNavCompanyName>{companyName}</TermsNavCompanyName>
      </TermsNavText>
    </TermsNavContainer>
  );
};
