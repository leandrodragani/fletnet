import React from 'react';
import { Dimensions, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';
import { Container } from '../../../../components/container';
import { Actions } from '../../actions';
import {
  DocumentationButtonContainer,
  DocumentationContainer,
  DocumentationSubtitleText,
  DocumentationTitleText,
  NextButtonText,
  NextButtonTouchable,
} from '../../styles';
import { DocumentationImage } from '../../components/documentation-image';
import { Button } from '../../../../components/button';
import { DropDownHelper } from '../../../../utils/helpers/dropdown';

class Dni extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: ' ',
      headerRight: <NextButtonTouchable disabled={params.disabled} onPress={() => navigation.navigate('DriverLicense')}><NextButtonText disabled={params.disabled}>Siguiente</NextButtonText></NextButtonTouchable>,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dni: undefined,
      loadingImage: false,
    };
  }

  componentDidMount() {
    const { navigation, actions } = this.props;
    actions.setCredentials(navigation.state.params);
    navigation.setParams({ disabled: true });
  }

  takePicture = async () => {
    const { actions, navigation } = this.props;
    const { status: status_camera_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status: status_camera } = await Permissions.askAsync(Permissions.CAMERA);
    if (status_camera !== "granted" || status_camera_roll !== "granted") {
      DropDownHelper.alert('warn', 'Permisos rechazados', 'Activá los permisos de la cámara desde la configuración de tu celular.');
    } else {
      this.setState({ loadingImage: true });
      const photo = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.5,
        mediaTypes: 'Images'
      });
      if (!photo.cancelled) {
        this.setState({ dni: photo.uri });
        actions.setIdentificationImage(photo);
        navigation.setParams({ disabled: false });
        this.setState({ loadingImage: false });
      }

    }
  }

  render() {
    const { dni, loadingImage } = this.state;
    return (
      <Container>
        <DocumentationTitleText>Agregá tu documento nacional de identidad</DocumentationTitleText>
        <DocumentationContainer>
          <DocumentationImage loading={loadingImage} source={dni === undefined ? require('../../../../assets/images/dni.png') : { uri: dni }} />
          <DocumentationSubtitleText>Para confirmar tu identidad, necesitamos tu documento. La foto deberá ser del frente, clara y con buena iluminación</DocumentationSubtitleText>
        </DocumentationContainer>
        <DocumentationButtonContainer>
          <View>
            <Divider style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }} />
            <Button
              width={Dimensions.get('window').width - 30}
              color="#665EFF"
              radius
              onPress={this.takePicture}
              title="AGREGAR FOTO DEL DNI"
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dni);
