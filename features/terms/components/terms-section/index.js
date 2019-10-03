import React from 'react';
import {
  TermsSectionBody,
  TermsSectionContainer,
  TermsSectionTitle
} from './styles';

export const TermsSection = (props) => {
  const { title, children } = props;
  return (
    <TermsSectionContainer>
      {title !== undefined && (
        <TermsSectionTitle>
          {title}
          {'\n'}
        </TermsSectionTitle>
      )}

      <TermsSectionBody>{children}</TermsSectionBody>
    </TermsSectionContainer>
  );
};
