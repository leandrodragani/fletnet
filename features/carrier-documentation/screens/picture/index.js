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

class Picture extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '',
      headerRight: (
        <NextButtonTouchable
          disabled={params.disabled}
          onPress={() => navigation.navigate('Vehicle')}
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
      picture: undefined,
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
      this.setState({ picture: photo.uri });
      actions.setCarrierProfileImage(photo);
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
      this.setState({ picture: photo.uri });
      actions.setCarrierProfileImage(photo);
      navigation.setParams({ disabled: false });
      this.setState({ loadingImage: false });
    }
  };

  render() {
    const { picture, loadingImage } = this.state;
    return (
      <Container>
        <DocumentationTitleText>Agregá una foto de perfil</DocumentationTitleText>
        <DocumentationContainer>
          <DocumentationImage
            loading={loadingImage}
            source={
              picture === undefined
                ? require('../../../../assets/images/profile.png')
                : { uri: picture }
            }
          />
          <DocumentationSubtitleText>
            La foto de perfil debera ser de tu cara, tomada de frente, con una buena iluminacion,
            fondo claro y que sea lo mas actual posible. No uses fotos antiguas
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
)(Picture);
