import React, { Fragment } from 'react';
import { MapView } from 'expo';
import { Platform, Image } from 'react-native';
import { decodePolylines } from '../../../../utils/helpers/mapview';

export const Directions = (props) => {
  const { origin, destinations, polyline } = props;
  return (
    <Fragment>
      <MapView.Marker
        coordinate={{
          latitude: parseFloat(origin.coordinates.latitude),
          longitude: parseFloat(origin.coordinates.longitude)
        }}
        title={origin.description}
        key={origin.id}
        image={
          Platform.OS === 'android'
            ? require('../../../../assets/images/pin_box_orange.png')
            : undefined
        }
      >
        {Platform.OS === 'ios' && (
          <Image
            source={require('../../../../assets/images/pin_box_orange.png')}
            resizeMethod="resize"
            style={{ width: 32, height: 43 }}
          />
        )}
      </MapView.Marker>
      {destinations.map(destination => (
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(destination.coordinates.latitude),
            longitude: parseFloat(destination.coordinates.longitude)
          }}
          title={destination.description}
          key={destination.id}
          image={
            Platform.OS === 'android'
              ? require('../../../../assets/images/pin_box_blue.png')
              : undefined
          }
        >
          {Platform.OS === 'ios' && (
            <Image
              source={require('../../../../assets/images/pin_box_blue.png')}
              resizeMethod="resize"
              style={{ width: 32, height: 43 }}
            />
          )}
        </MapView.Marker>
      ))}
      <MapView.Polyline
        coordinates={[
          origin.coordinates,
          ...decodePolylines(polyline),
          destinations[destinations.length - 1].coordinates
        ]}
        strokeColor="#665EFF"
        strokeWidth={5}
      />
    </Fragment>
  );
};
