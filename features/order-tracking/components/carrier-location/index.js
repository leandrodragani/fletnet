import React from 'react';
import { MapView } from 'expo';
import { LocationBox, LocationDistanceBox, LocationDistanceText, LocationDistanceTextSmall, LocationText } from './styles';

export const CarrierLocation = (props) => {
  const { location, distance } = props;
  return (
    <MapView.Marker
      coordinate={{
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude)
      }}
      image={require('../../../../assets/images/carrier_pin.png')}
      anchor={{ x: 0, y: 0 }}
    >
      <LocationBox>
        <LocationDistanceBox>
          <LocationDistanceText>{distance}</LocationDistanceText>
          <LocationDistanceTextSmall>KM</LocationDistanceTextSmall>
        </LocationDistanceBox>
        <LocationText>Distancia</LocationText>
      </LocationBox>
    </MapView.Marker>
  );
};
