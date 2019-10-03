import React, { Fragment } from 'react';
import { View, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validate } from 'validate.js';
import { Container } from '../../../../components/container';
import { Actions } from '../../actions';
import {
  DocumentationButtonContainer,
  DocumentationContainer,
  DocumentationImage,
  DocumentationSubtitleText,
  DocumentationTitleText
} from '../../styles';
import { Button } from '../../../../components/button';
import { TextInput } from './styles';
import { Modal } from '../../../../components/modal';
import validations from '../../validations';
import { DropDownHelper } from '../../../../utils/helpers/dropdown';
import { DismissKeyboard } from '../../../../components/dismiss-keyboard';
import { ModalPicker } from './components/modal-picker';

class Send extends React.Component {
  static navigationOptions = () => ({
    title: 'Registro transportista'
  });

  constructor(props) {
    super(props);
    this.state = {
      tara: '',
      licensePlate: '',
      telephone: '',
      dniNumber: '',
      model: '',
      brand: '',
      modelPickerVisible: false,
      brandPickerVisible: false,
      successVisible: false
    };
  }

  onContactNumberChange = (text) => {
    this.setState({ telephone: text });
  };

  onTaraChange = (text) => {
    this.setState({ tara: text });
  };

  onLicensePlateChange = (text) => {
    this.setState({ licensePlate: text });
  };

  onDniChange = (text) => {
    this.setState({ dniNumber: text });
  };

  BrandPicker = () => {
    const { brandPickerVisible } = this.state;
    const { actions, reducer } = this.props;

    return (
      <ModalPicker
        title="Seleccioná la marca de tu vehículo"
        data={reducer.brands}
        visible={brandPickerVisible}
        onClose={() => {
          this.setState({ brandPickerVisible: false });
        }}
        onPressItem={(item) => {
          this.setState({ brandPickerVisible: !brandPickerVisible, brand: item, model: '' });
          actions.vehicleModelsRequest(reducer.brands.find((brand) => brand.key === item.key));
        }}
      />
    );
  };

  ModelPicker = () => {
    const { modelPickerVisible } = this.state;
    const { reducer } = this.props;

    return (
      <ModalPicker
        title="Seleccioná el modelo de tu vehículo"
        data={reducer.models}
        visible={modelPickerVisible}
        onClose={() => {
          this.setState({ modelPickerVisible: false });
        }}
        onPressItem={(item) =>
          this.setState({ modelPickerVisible: !modelPickerVisible, model: item })
        }
      />
    );
  };

  SuccessModal = () => {
    const { successVisible } = this.state;
    return (
      <Modal
        header={false}
        onRequestClose={() => this.setState({ successVisible: !successVisible })}
        visible={successVisible}
      >
        <Fragment>
          <DocumentationTitleText>Registro completado correctamente!</DocumentationTitleText>
          <DocumentationContainer>
            <DocumentationImage source={require('../../../../assets/images/success.png')} />
            <DocumentationSubtitleText>
              Gracias por sumarte a la comunidad de transportistas, verificaremos todos los datos
              que nos enviaste, para comprobar que puedas circular.
            </DocumentationSubtitleText>
          </DocumentationContainer>
          <DocumentationButtonContainer>
            <View>
              <Divider style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }} />
              <Button
                width={Dimensions.get('window').width - 30}
                color="#665EFF"
                radius
                onPress={() => this.setState({ successVisible: !successVisible })}
                title="ACEPTAR"
              />
            </View>
          </DocumentationButtonContainer>
        </Fragment>
      </Modal>
    );
  };

  render() {
    const {
      dniNumber,
      tara,
      licensePlate,
      telephone,
      model,
      brand,
      brandPickerVisible,
      modelPickerVisible
    } = this.state;
    const { reducer, actions } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <DismissKeyboard>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => this.setState({ brandPickerVisible: !brandPickerVisible })}
                >
                  <TextInput
                    label="MARCA DEL VEHICULO"
                    placeholder="Pulsá para seleccionar la marca"
                    keyboardType="default"
                    value={(brand && brand.label.toUpperCase()) || ''}
                    returnKeyType="done"
                    maxLength={80}
                    autoCapitalize="words"
                    editable={false}
                    onTouchStart={() => this.setState({ brandPickerVisible: !brandPickerVisible })}
                  />
                </TouchableOpacity>
                {reducer.vehicleType !== 'motorcycle' ? (
                  <TouchableOpacity
                    onPress={() => this.setState({ modelPickerVisible: !modelPickerVisible })}
                  >
                    <TextInput
                      label="MODELO DEL VEHICULO"
                      placeholder="Pulsá para seleccionar el modelo"
                      keyboardType="default"
                      value={(model && model.label.toUpperCase()) || ''}
                      returnKeyType="done"
                      maxLength={80}
                      autoCapitalize="words"
                      editable={false}
                      onTouchStart={() =>
                        this.setState({ modelPickerVisible: !modelPickerVisible })
                      }
                    />
                  </TouchableOpacity>
                ) : null}
                <TextInput
                  label="TELEFONO DE CONTACTO"
                  placeholder="Ingresá tu numero de celular"
                  keyboardType="default"
                  onChangeText={this.onContactNumberChange}
                  value={telephone}
                  returnKeyType="done"
                  maxLength={80}
                  autoCapitalize="words"
                />
                <TextInput
                  label="PATENTE"
                  placeholder="Ingresá la patente de tu vehículo"
                  keyboardType="default"
                  onChangeText={this.onLicensePlateChange}
                  value={licensePlate}
                  returnKeyType="done"
                  maxLength={80}
                  autoCapitalize="characters"
                />
                <TextInput
                  label="TARA"
                  placeholder="Ingresá la TARA de tu vehículo"
                  keyboardType="default"
                  onChangeText={this.onTaraChange}
                  value={tara}
                  returnKeyType="done"
                  maxLength={80}
                  autoCapitalize="words"
                />
                <TextInput
                  label="DNI"
                  placeholder="Ingresá tu número de DNI"
                  keyboardType="default"
                  onChangeText={this.onDniChange}
                  value={dniNumber}
                  returnKeyType="done"
                  maxLength={80}
                  autoCapitalize="words"
                />
                <View style={{ flex: 1 }} />
                <DocumentationButtonContainer>
                  <View>
                    <Divider
                      style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }}
                    />
                    <Button
                      width={Dimensions.get('window').width - 30}
                      color="#665EFF"
                      radius
                      onPress={() => {
                        const request = {
                          tara,
                          licensePlate: licensePlate.toUpperCase(),
                          telephone,
                          vehicleType: reducer.vehicleType,
                          model,
                          brand,
                          dniNumber,
                          monotributo: reducer.monotributo,
                          lnh: reducer.lnh,
                          dni: reducer.dni,
                          insurance: reducer.insurance,
                          profile: reducer.profile,
                          vehicle: reducer.vehicle,
                          driverLicense: reducer.driverLicense,
                          credentials: reducer.credentials
                        };
                        const val = validate(request, validations, { format: 'flat' });
                        if (val === undefined) {
                          actions.carrierDocumentationRequest(request);
                        } else {
                          DropDownHelper.alert('error', 'Error', val[0]);
                        }
                      }}
                      loading={reducer.isSavingCarrier}
                      title="ENVIAR"
                    />
                  </View>
                </DocumentationButtonContainer>
                <this.BrandPicker />
                <this.ModelPicker />
                <this.SuccessModal />
              </View>
            </View>
          </DismissKeyboard>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.carrierDocumentationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Send);
