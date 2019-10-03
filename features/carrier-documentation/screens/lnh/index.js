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
import { OmitirButtonContainer } from './styles';

class Lnh extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    console.log(params);
    return {
      title: '',
      headerRight: <NextButtonTouchable onPress={() => navigation.navigate('Monotributo')}><NextButtonText disabled={false}>Siguiente</NextButtonText></NextButtonTouchable>,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      lnh: undefined,
      loadingImage: false
    };
  }

  takePicture = async () => {
    const { actions } = this.props;
    this.setState({ loadingImage: true });
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      mediaTypes: 'Images'
    });
    if (!photo.cancelled) {
      this.setState({ lnh: photo.uri });
      actions.setLnhImage(photo);
      this.setState({ loadingImage: false });
    }
  }

  render() {
    const { lnh, loadingImage } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <DocumentationTitleText>Agregá tu licencia nacional habilitante</DocumentationTitleText>
        <DocumentationContainer>
          <DocumentationImage loading={loadingImage} source={lnh === undefined ? require('../../../../assets/images/lnh.png') : { uri: lnh }} />
          <DocumentationSubtitleText>En el caso de que la poseas, te pedimos tu licencia nacional habilitante para acceder a otro tipo de clientes, de lo contrario presiona omitir.</DocumentationSubtitleText>
        </DocumentationContainer>
        <DocumentationButtonContainer>
          <View>
            <Divider style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }} />
            <Button
              width={Dimensions.get('window').width - 30}
              color="#665EFF"
              radius
              onPress={this.takePicture}
              title="AGREGAR FOTO DE TU LNH"
            />
            <OmitirButtonContainer>
              <Button
                width={Dimensions.get('window').width - 30}
                color="#959DAD"
                radius
                onPress={() => navigation.navigate('Monotributo')}
                title="OMITIR"
              />
            </OmitirButtonContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Lnh);
