import React from 'react';
import { Platform } from 'react-native';
import {
  HorizontalFlatList,
  VehicleDescriptionText,
  VehicleImage,
  VehicleTypeTouchable
} from './styles';

export const VehicleSelector = (props) => {
  const { vehicles, vehicleType, onVehiclePress } = props;
  return (
    <HorizontalFlatList
      data={vehicles}
      extraData={vehicleType}
      removeClippedSubviews={Platform.OS === 'android'}
      renderItem={({ item }) => (
        <VehicleTypeTouchable key={item.key} selected={item.key === vehicleType} onPress={() => onVehiclePress(item)}>
          <VehicleImage
            source={item.icon}
            resizeMethod="resize"
            key={item.key}
          />
          <VehicleDescriptionText>
            {item.description}
            {' '}
            {item.capacity}
            {' '}
            KG
          </VehicleDescriptionText>
        </VehicleTypeTouchable>
      )}
      keyExtractor={item => item.key}
      horizontal
    />
  );
};
