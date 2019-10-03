import React from 'react';
import { MapView } from 'expo';
import { MinimapContainer } from './styles';
import { getRegionForCoordinates, decodePolylines } from '../../utils/helpers/mapview';

export const MinimapLocations = (props) => {
  const { origin, destinations, polyline } = props;
  return (
    <MinimapContainer>
      <MapView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1
        }}
        showsUserLocation={false}
        region={getRegionForCoordinates([
          origin.coordinates,
          ...polyline,
          destinations[destinations.length - 1].coordinates
        ])}
        provider="google"
        loadingEnabled
      >
        {origin !== undefined && (
          <MapView.Marker
            coordinate={origin.coordinates}
            key={origin.id}
            image={require('../../assets/images/pin_box_blue.png')}
          />
        )}
        {destinations !== undefined
          && destinations.length > 0
          && destinations.map(destination => (
            <MapView.Marker
              coordinate={destination.coordinates}
              key={destination.id}
              image={require('../../assets/images/pin_box_blue.png')}
            />
          ))}
        {polyline !== undefined && (
          <MapView.Polyline
            coordinates={[
              origin.coordinates,
              ...polyline,
              destinations[destinations.length - 1].coordinates
            ]}
            strokeColor="#665EFF"
            strokeWidth={5}
          />
        )}
      </MapView>
    </MinimapContainer>
  );
};
