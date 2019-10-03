import React, { Fragment } from 'react';
import { EmptyListWarningContainer, EmptyListWarningImage, EmptyListWarningText } from './styles';

export const EmptyListWarning = (props) => {
  const { description, image } = props;
  return (
    <EmptyListWarningContainer>
      <EmptyListWarningImage source={image} />
      <EmptyListWarningText>{description}</EmptyListWarningText>
    </EmptyListWarningContainer>
  );
};
