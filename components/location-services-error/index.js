import React, { Fragment } from 'react';
import { Button } from '../button';
import { ButtonContainer, LocationServicesContainer, LocationServicesImage, LocationServicesText } from './styles';

export const LocationServicesError = (props) => {
  const { onConfigurationPress, onLoadAgainPress, description, loading } = props;
  return (
    <LocationServicesContainer>
      <LocationServicesImage source={undefined} />
      <LocationServicesText>{description}</LocationServicesText>
      <ButtonContainer>
        <Button
          width="150px"
          color="#ff7043"
          radius
          onPress={onConfigurationPress}
          title="Configuración"
        />
        <Button
          width="150px"
          color="#ff7043"
          radius
          onPress={onLoadAgainPress}
          title="Volver a cargar"
          loading={loading}
          disabled={loading}
        />
      </ButtonContainer>
    </LocationServicesContainer>
  );
};
