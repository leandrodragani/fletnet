import React from 'react';
import { LinearGradient } from 'expo';
import { ContainerView } from './styles';

export const Container = (props) => {
  const { children } = props;
  return (
    <ContainerView>
      <LinearGradient style={{ flex: 1 }} colors={['#FFFFFF', '#F7F7FA']}>
        {children}
      </LinearGradient>
    </ContainerView>
  );
};
