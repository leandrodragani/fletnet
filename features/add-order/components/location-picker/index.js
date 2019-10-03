import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { MapView, Icon } from 'expo';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/button';
import { GooglePlacesInput, ButtonContainer } from './styles';
import { GOOGLE_MAPS_API_KEY } from '../../../../utils/constants/keys';

export const LocationPickerModal = (props) => {
  const {
    location,
    onButtonPress,
    onPlacesInputSearch,
    buttonTitle,
    title,
    visible,
    onRequestClose,
    uid
  } = props;
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      title={title}
      header
      headerColor="transparent"
      headerLeft={
        <TouchableOpacity style={{ left: 15, top: 10 }} onPress={onRequestClose}>
          <Icon.Ionicons name="md-arrow-back" color="#454F63" size={25} />
        </TouchableOpacity>
      }
    >
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
        region={
          location !== undefined
            ? {
                ...location.coordinates,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
              }
            : {
                latitude: -34.603722,
                longitude: -58.381592,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
              }
        }
        provider="google"
        loadingEnabled
      >
        {location !== undefined && (
          <MapView.Marker
            coordinate={location.coordinates}
            key={location.id}
            description={location.description}
          />
        )}
      </MapView>
      <GooglePlacesInput
        placeholder="Buscar ubicación..."
        minLength={2}
        autoFocus={false}
        returnKeyType="search"
        listViewDisplayed="true"
        fetchDetails
        renderDescription={(row) => row.description}
        onPress={onPlacesInputSearch}
        getDefaultValue={() => ''}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          sessiontoken: uid,
          language: 'es',
          components: 'country:ar'
        }}
      />
      <ButtonContainer>
        <Button
          width={Dimensions.get('window').width - 60}
          color="#FF9057"
          radius
          onPress={onButtonPress}
          title={buttonTitle}
        />
      </ButtonContainer>
    </Modal>
  );
};
