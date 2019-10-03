import React from 'react';
import { View, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { Container } from '../../../../components/container';
import { Actions } from '../../actions';
import {
  DocumentationButtonContainer,
  DocumentationContainer,
  DocumentationSubtitleText,
  DocumentationTitleText,
  NextButtonText,
  NextButtonTouchable
} from '../../styles';
import { DocumentationImage } from '../../components/documentation-image';
import { Button } from '../../../../components/button';
import { GaleriaButtonContainer } from './styles';

class Vehicle extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '',
      headerRight: (
        <NextButtonTouchable
          disabled={params.disabled}
          onPress={() => navigation.navigate('VehicleInformation')}
        >
          <NextButtonText disabled={params.disabled}>Siguiente</NextButtonText>
        </NextButtonTouchable>
      ),
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      vehicle: undefined,
      loadingImage: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ disabled: true });
  }

  takePicture = async () => {
    const { actions, navigation } = this.props;
    this.setState({ loadingImage: true });
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      mediaTypes: 'Images'
    });
    if (!photo.cancelled) {
      this.setState({ vehicle: photo.uri });
      actions.setCarrierVehicleImage(photo);
      navigation.setParams({ disabled: false });
      this.setState({ loadingImage: false });
    }
  };

  loadFromCameraRoll = async () => {
    const { actions, navigation } = this.props;
    this.setState({ loadingImage: true });
    const photo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      mediaTypes: 'Images'
    });
    if (!photo.cancelled) {
      this.setState({ vehicle: photo.uri });
      actions.setCarrierProfileImage(photo);
      navigation.setParams({ disabled: false });
      this.setState({ loadingImage: false });
    }
  };

  render() {
    const { vehicle, loadingImage } = this.state;
    return (
      <Container>
        <DocumentationTitleText>Agregá la foto de tu vehiculo</DocumentationTitleText>
        <DocumentationContainer>
          <DocumentationImage
            loading={loadingImage}
            source={
              vehicle === undefined
                ? require('../../../../assets/images/driverlicense.png')
                : { uri: vehicle }
            }
          />
          <DocumentationSubtitleText>
            Para que los clientes te identifiquen al momento de realizar un servicio, agrega una
            foto de tu vehículo. Recordá que es importante para dar una buena impresión.
          </DocumentationSubtitleText>
        </DocumentationContainer>
        <DocumentationButtonContainer>
          <View>
            <Divider style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }} />
            <Button
              width={Dimensions.get('window').width - 30}
              color="#665EFF"
              radius
              onPress={this.takePicture}
              title="CAMARA"
            />
            <GaleriaButtonContainer>
              <Button
                width={Dimensions.get('window').width - 30}
                color="#959DAD"
                radius
                onPress={this.loadFromCameraRoll}
                title="GALERIA"
              />
            </GaleriaButtonContainer>
          </View>
        </DocumentationButtonContainer>
      </Container>
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
)(Vehicle);
