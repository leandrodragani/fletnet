import React, { Fragment } from 'react';
import { FlatList, Platform } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { Icon } from 'expo';
import { getLocationDescriptionFormatted } from '../../utils/string-utils';
// import { LanguageHelper } from "../../../../utils/helpers/language";

export const Trip = (props) => {
  const { origin, destinations, onPressOrigin, onPressDestination, dark } = props;
  return (
    <Fragment>
      <ListItem
        titleStyle={{ fontSize: 12, fontWeight: 'normal', color: '#959DAD', marginBottom: 3 }}
        subtitleStyle={{ fontSize: 16, fontWeight: '600', color: dark ? 'white' : '#454F63' }}
        title="Lugar de origen"
        subtitle={getLocationDescriptionFormatted(origin.description)}
        leftIcon={(
          <Icon.MaterialCommunityIcons
            name="map-marker-radius"
            color="#665EFF"
            size={25}
          />
        )}
        containerStyle={{
          marginHorizontal: 5,
          paddingVertical: 15,
          backgroundColor: dark ? '#2A2E43' : 'white'
        }}
        onPress={onPressOrigin}
      />
      <Divider style={{ backgroundColor: dark ? '#707070' : '#F4F4F6', marginHorizontal: 10, opacity: dark ? 0.2 : 1 }} />
      <FlatList
        data={destinations}
        removeClippedSubviews={Platform.OS === 'android'}
        style={{ paddingBottom: 5 }}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 10 }} />}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            titleStyle={{ fontSize: 12, fontWeight: 'normal', color: '#959DAD', marginBottom: 3 }}
            subtitleStyle={{ fontSize: 16, fontWeight: '600', color: dark ? 'white' : '#454F63' }}
            containerStyle={{
              marginHorizontal: 5,
              paddingVertical: 15,
              backgroundColor: dark ? '#2A2E43' : 'white'
            }}
            title="Destino"
            subtitle={getLocationDescriptionFormatted(item.description)}
            leftIcon={(
              <Icon.MaterialCommunityIcons
                name="map-marker-outline"
                color="#3ACCE1"
                size={25}
              />
            )}
            onPress={onPressDestination}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Fragment>
  );
};
