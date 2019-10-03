/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import { GlobalTextInput, TextInputLabel } from './styles';

export const TextInput = props => (
  <Fragment>
    {props.label && <TextInputLabel>{props.label}</TextInputLabel>}
    <GlobalTextInput
      {...props}
      autoCorrect={false}
      underlineColorAndroid="transparent"
    />
  </Fragment>
);
