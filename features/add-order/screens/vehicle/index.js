import React from 'react';
import { View, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setVehicleType } from '../../actions';
import { HeaderTitle, ButtonContainer2 } from '../../styles';
import { Caption } from './styles';
import { Container } from '../../../../components/container';
import { VehicleSelector } from '../../../../components/vehicle-selector';
import { Button } from '../../../../components/button';
import { VEHICLES } from '../../../../utils/vehicle-utils';

class Vehicle extends React.Component {
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
      vehicleType: undefined
    };
  }

  goToTrip = () => {
    const { vehicleType } = this.state;
    const { navigation, actions } = this.props;
    actions.setVehicleType(vehicleType);
    navigation.navigate('Trip');
  };

  render() {
    const { vehicleType } = this.state;
    return (
      <Container>
        <HeaderTitle>Elegí el tipo de vehículo</HeaderTitle>
        <Caption>DESLIZÁ Y SELECCIONÁ EL QUE NECESITES</Caption>
        <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
          <VehicleSelector
            vehicles={VEHICLES}
            vehicleType={vehicleType}
            onVehiclePress={item => this.setState({ vehicleType: item.key })}
          />
        </View>
        <ButtonContainer2>
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
              onPress={this.goToTrip}
              disabled={vehicleType === undefined}
            />
          </View>
        </ButtonContainer2>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setVehicleType }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Vehicle);
