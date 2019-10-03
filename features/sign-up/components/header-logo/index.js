import React from 'react';
import { HeaderLogoContainer, Logo, SloganText } from './styles';

export const HeaderLogo = (props) => {
  const { logo, slogan } = props;
  return (
    <HeaderLogoContainer>
      <Logo source={logo} />
      <SloganText>{slogan}</SloganText>
    </HeaderLogoContainer>
  );
};
