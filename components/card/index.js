import React, { Fragment } from 'react';
import { CardContainer, CardLabel } from './styles';

export const Card = (props) => {
  const { children, label } = props;
  return (
    <Fragment>
      {label && <CardLabel>{label}</CardLabel>}
      <CardContainer>{children}</CardContainer>
    </Fragment>
  );
};
