import React, { Fragment } from 'react';
import { Icon } from 'expo';
import { FlatList, Platform } from 'react-native';
import { Divider } from 'react-native-elements';
import { AddOrderItem } from '../list-item';

export const AddOrderLocationsItems = (props) => {
  const {
    origin,
    destinations,
    onPressOrigin,
    onPressDestination,
    onPressAddLocation
  } = props;

  return (
    <Fragment>
      <AddOrderItem
        title={origin !== undefined ? origin.description : 'Pulsa para establecer el origen del pedido'}
        subtitle={origin !== undefined ? 'Pulsa para modificar el origen del pedido' : undefined}
        leftIcon={(
          <Icon.MaterialCommunityIcons
            name="map-marker-radius"
            color="#665EFF"
            size={25}
          />
        )}
        content
        onPress={onPressOrigin}
      />
      <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 2, marginHorizontal: 20 }} />
      <FlatList
        data={destinations}
        removeClippedSubviews={Platform.OS === 'android'}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 5, marginHorizontal: 20 }} />}
        renderItem={({ item }) => (
          <AddOrderItem
            key={item.id}
            title={item.description}
            subtitle="Pulsa para eliminar este destino"
            leftIcon={(
              <Icon.MaterialCommunityIcons
                name="map-marker-outline"
                color="#3ACCE1"
                size={25}
              />
            )}
            onPress={() => onPressDestination(item)}
          />
        )}
        keyExtractor={item => item.id}
        ListFooterComponent={(
          <AddOrderItem
            title="Pulsa para agregar un destino"
            leftIcon={(
              <Icon.MaterialCommunityIcons
                name="map-marker-plus"
                color="#FF9057"
                size={25}
              />
            )}
            onPress={onPressAddLocation}
          />
        )}
      />
    </Fragment>
  );
};
