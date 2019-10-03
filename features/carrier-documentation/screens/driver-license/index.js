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
  NextButtonTouchable,
  NextButtonText,
} from '../../styles';
import { DocumentationImage } from '../../components/documentation-image';
import { Button } from '../../../../components/button';

class DriverLicense extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    console.log(params);
    return {
      title: '',
      headerRight: <NextButtonTouchable disabled={params.disabled} onPress={() => navigation.navigate('Insurance')}><NextButtonText disabled={params.disabled}>Siguiente</NextButtonText></NextButtonTouchable>,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      driverLicense: undefined,
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
      this.setState({ driverLicense: photo.uri });
      actions.setDriverLicenseImage(photo);
      navigation.setParams({ disabled: false });
      this.setState({ loadingImage: false });
    }
  }

  render() {
    const { driverLicense, loadingImage } = this.state;
    return (
      <Container>
        <DocumentationTitleText>Agregá tu licencia {'\n'}de conducir</DocumentationTitleText>
        <DocumentationContainer>
          <DocumentationImage loading={loadingImage} source={driverLicense === undefined ? require('../../../../assets/images/driverlicense.png') : { uri: driverLicense }} />
          <DocumentationSubtitleText>Para confirmar que podés circular con tu vehículo y realizar pedidos, necesitamos tu licencia. La foto deberá ser del frente, clara y con buena iluminación</DocumentationSubtitleText>
        </DocumentationContainer>
        <DocumentationButtonContainer>
          <View>
            <Divider style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }} />
            <Button
              width={Dimensions.get('window').width - 30}
              color="#665EFF"
              radius
              onPress={this.takePicture}
              title="AGREGAR FOTO DE TU LICENCIA"
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverLicense);
