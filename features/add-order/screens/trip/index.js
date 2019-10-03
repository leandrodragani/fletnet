import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { filter } from 'lodash/collection';
import { setTrip } from '../../actions';
import { HeaderTitle } from '../../styles';
import { Container } from '../../../../components/container';
import { AddOrderLocationsItems } from '../../components/locations-items';
import { LocationPickerModal } from '../../components/location-picker';
import { DropDownHelper } from '../../../../utils/helpers/dropdown';
import { Button } from '../../../../components/button';
import { getLocationDescriptionPersonalized } from '../../../../utils/string-utils';
import { Card, ButtonContainer } from './styles';

class Trip extends React.Component {
  static navigationOptions = () => {
    return {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        borderBottomWidth: 0
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      origin: undefined,
      destinations: [],
      lastLocation: undefined,
      originPickerVisible: false,
      destinationPickerVisible: false
    };
  }

  goToSpecs = () => {
    const { origin, destinations } = this.state;
    const { navigation, actions } = this.props;
    actions.setTrip({ origin, destinations });
    navigation.navigate('Specs');
  };

  checkStringContainNumber = (value) => {
    const containNumberReg = new RegExp(/\d/);
    return containNumberReg.test(value);
  };

  locationPickerOrigin = () => {
    const { lastLocation, originPickerVisible } = this.state;
    const { global } = this.props;

    return (
      <LocationPickerModal
        title="Origen"
        location={lastLocation}
        visible={originPickerVisible}
        onRequestClose={() => this.setState({ originPickerVisible: false })}
        onPlacesInputSearch={(data, details) => {
          const location = {
            coordinates: {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            },
            description: data.description,
            id: data.id
          };

          if (this.checkStringContainNumber(data.description)) {
            location.description = getLocationDescriptionPersonalized(
              location.description
            );
            this.setState({ origin: location, lastLocation: location });
          } else {
            this.setState({
              lastLocation: undefined,
              originPickerVisible: false
            });
            DropDownHelper.alert(
              'error',
              'Error',
              'La dirección ingresada debe contener una altura específica.'
            );
          }
        }}
        buttonTitle="ESTABLECER ORIGEN"
        onButtonPress={() => this.setState({
          originPickerVisible: false,
          lastLocation: undefined
        })}
        uid={global.user.uid}
      />
    );
  };

  locationPickerDestination = () => {
    const { lastLocation, destinationPickerVisible, destinations } = this.state;
    const { global } = this.props;

    return (
      <LocationPickerModal
        title="Destinos"
        location={lastLocation}
        visible={destinationPickerVisible}
        onRequestClose={() => this.setState({ destinationPickerVisible: false })}
        onPlacesInputSearch={(data, details) => {
          const location = {
            coordinates: {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            },
            description: data.description,
            id: data.id
          };

          if (this.checkStringContainNumber(data.description)) {
            location.description = getLocationDescriptionPersonalized(
              location.description
            );
            this.setState({
              destinations: destinations.concat(location),
              lastLocation: location
            });
          } else {
            this.setState({
              lastLocation: undefined,
              destinationPickerVisible: false
            });
            DropDownHelper.alert(
              'error',
              'Error',
              'La dirección ingresada debe contener una altura específica.'
            );
          }
        }}
        buttonTitle="AGREGAR DESTINO"
        onButtonPress={() => this.setState({ destinationPickerVisible: false, lastLocation: undefined })}
        uid={global.user.uid}
      />
    );
  };

  render() {
    const { origin, destinations } = this.state;
    return (
      <Container>
        <HeaderTitle>Armá tu recorrido</HeaderTitle>
        <ScrollView>
          <Card>
            <AddOrderLocationsItems
              onPressOrigin={() => this.setState({ originPickerVisible: true })}
              origin={origin}
              destinations={destinations}
              onPressAddLocation={() => this.setState({ destinationPickerVisible: true })}
              onPressDestination={item => this.setState({ destinations: filter(destinations, o => o.id !== item.id) })}
            />
          </Card>
        </ScrollView>
        <ButtonContainer>
          <View>
            <Divider
              style={{
                backgroundColor: 'gray',
                opacity: 0.2,
                marginVertical: 10
              }}
            />
            <Button
              width={Dimensions.get('window').width - 40}
              title="CONTINUAR"
              color="#665EFF"
              onPress={this.goToSpecs}
              disabled={destinations.length === 0 || origin === undefined}
            />
          </View>
        </ButtonContainer>
        {this.locationPickerOrigin()}
        {this.locationPickerDestination()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    global: state.globalReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setTrip }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
