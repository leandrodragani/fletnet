import React from 'react';
import { Dimensions, Platform, Divider } from 'react-native';
import styled from 'styled-components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const GooglePlacesInput = props => (
  <GooglePlacesAutocomplete
    styles={{
      container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 70 - 10 : 56 - 10,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.24,
        shadowRadius: 7,
        shadowOffset: {
          height: 7,
          width: 0
        },
        elevation: 7,
        margin: 10,
        borderRadius: 15,
      },
      textInputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
      },
      textInput: {
        fontSize: 16,
        color: '#454F63'
      },
      predefinedPlacesDescription: {
        color: '#454F63'
      },
      separator: {
        backgroundColor: '#F4F4F6',
        marginHorizontal: 10
      },
      poweredContainer: {
        display: 'none'
      }
    }}
    {...props}
  />
);

export const ButtonContainer = styled.View` 
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 0px;
  right: 0px;
  align-self: stretch;
`;
