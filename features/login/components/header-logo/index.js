import React from 'react';
import { HeaderLogoContainer, Logo } from './styles';

export const HeaderLogo = (props) => {
  const { logo } = props;
  return (
    <HeaderLogoContainer>
      <Logo source={logo} />
    </HeaderLogoContainer>
  );
};
