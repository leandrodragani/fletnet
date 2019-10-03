import React from 'react';
import { ActivityIndicator } from 'react-native';
import { VectorImage, LoadingContainer } from './styles';

export const DocumentationImage = (props) => {
  const { source, loading } = props;
  return loading ? (
    <LoadingContainer>
      <ActivityIndicator />
    </LoadingContainer>
  ) : (
    <VectorImage source={source} />
  );
};
