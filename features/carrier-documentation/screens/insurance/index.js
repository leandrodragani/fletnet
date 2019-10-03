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

class Insurance extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '',
      headerRight: <NextButtonTouchable disabled={params.disabled} onPress={() => navigation.navigate('Lnh')}><NextButtonText disabled={params.disabled}>Siguiente</NextButtonText></NextButtonTouchable>,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      insurance: undefined,
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
      this.setState({ insurance: photo.uri });
      actions.setInsuranceImage(photo);
      navigation.setParams({ disabled: false });
      this.setState({ loadingImage: false });
    }
  }

  render() {
    const { insurance, loadingImage } = this.state;
    return (
      <Container>
        <DocumentationTitleText>Agregá tu cobertura de seguro</DocumentationTitleText>
        <DocumentationContainer>
          <DocumentationImage loading={loadingImage} source={insurance === undefined ? require('../../../../assets/images/insurance.png') : { uri: insurance }} />
          <DocumentationSubtitleText>Para garantizarle seguridad a los clientes, necesitamos una foto del comprobante de cobertura de tu seguro. Asegurate de que sea una poliza vigente.</DocumentationSubtitleText>
        </DocumentationContainer>
        <DocumentationButtonContainer>
          <View>
            <Divider style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }} />
            <Button
              width={Dimensions.get('window').width - 30}
              color="#665EFF"
              radius
              onPress={this.takePicture}
              title="AGREGAR FOTO DEL SEGURO"
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

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
