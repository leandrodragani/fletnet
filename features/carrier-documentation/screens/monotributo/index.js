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

class Monotributo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '',
      headerRight: <NextButtonTouchable disabled={params.disabled} onPress={() => navigation.navigate('Picture')}><NextButtonText disabled={params.disabled}>Siguiente</NextButtonText></NextButtonTouchable>,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      monotributo: undefined,
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
      this.setState({ monotributo: photo.uri });
      actions.setMonotributoImage(photo);
      navigation.setParams({ disabled: false });
      this.setState({ loadingImage: false });
    }
  }

  render() {
    const { monotributo, loadingImage } = this.state;
    return (
      <Container>
        <DocumentationTitleText>Agregá tu constancia de monotributo</DocumentationTitleText>
        <DocumentationContainer>
          <DocumentationImage loading={loadingImage} source={monotributo === undefined ? require('../../../../assets/images/driverlicense.png') : { uri: monotributo }} />
          <DocumentationSubtitleText>Para cumplir con las normativas, debemos solicitarte una constancia de monotributo.</DocumentationSubtitleText>
        </DocumentationContainer>
        <DocumentationButtonContainer>
          <View>
            <Divider style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }} />
            <Button
              width={Dimensions.get('window').width - 30}
              color="#665EFF"
              radius
              onPress={this.takePicture}
              title="AGREGAR FOTO DEL MONOTRIBUTO"
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

export default connect(mapStateToProps, mapDispatchToProps)(Monotributo);
