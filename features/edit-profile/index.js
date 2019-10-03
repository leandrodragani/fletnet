import React from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, View, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { ImagePicker, Permissions } from 'expo';
import { ListItem, Avatar } from 'react-native-elements';
import { validate } from 'validate.js';
import { Container } from '../../components/container';
import { LanguageHelper } from '../../utils/helpers/language';
import { Actions } from './actions';
import { getDateToString } from '../../utils/date-utils';
import { CARRIER_USER_TYPE } from '../../utils/constants/users';
import { Button } from '../../components/button';
import { ActionsModal } from '../../components/actions-modal';
import { Card } from '../../components/card';
import { DropDownHelper } from '../../utils/helpers/dropdown';
import validations from './validations';
import { ScrollView, ButtonContainer, AvatarContainer } from './styles';

class EditProfile extends React.Component {
  static navigationOptions = {
    title: 'Editar perfil',
    headerTitleStyle: { color: '#454F63' },
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 6,
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      fullname: null,
      contact_number: null,
      profileImage: null,
      selectImageVisible: false
    };
  }

  componentDidMount() {
    const { global } = this.props;
    this.onChangeFullname(global.user.fullname);
    if (global.user.type === CARRIER_USER_TYPE) {
      this.onChangeContactNumber(global.user.contact_number);
    }
  }

  takePicture = async () => {
    this.setState({ selectImageVisible: false });
    const { status: statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status: statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
    if (statusCamera !== 'granted' || statusCameraRoll !== 'granted') {
      DropDownHelper.alert(
        'warn',
        'Permisos rechazados',
        'Activá los permisos de la cámara desde la configuración de tu celular.'
      );
    } else {
      const photo = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.5,
        mediaTypes: 'Images'
      });
      console.log(photo.uri);
      if (!photo.cancelled) {
        this.setState({ profileImage: photo });
      }
    }
  };

  loadFromCameraRoll = async () => {
    this.setState({ selectImageVisible: false });
    const photo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      mediaTypes: 'Images'
    });
    if (!photo.cancelled) {
      this.setState({ profileImage: photo });
    }
  };

  onChangeFullname = (text) => {
    this.setState({ fullname: text });
  };

  onChangeContactNumber = (text) => {
    this.setState({ contact_number: text });
  };

  renderSelectImageOptions = () => {
    const { selectImageVisible } = this.state;

    return (
      <ActionsModal
        type="dark"
        visible={selectImageVisible}
        onRequestClose={() => this.setState({ selectImageVisible: false })}
        title="Seleccioná una opción"
      >
        <Button
          width={Dimensions.get('window').width - 40}
          color="#665EFF"
          radius
          onPress={this.takePicture}
          title="CÁMARA"
        />
        <Button
          width={Dimensions.get('window').width - 40}
          color="#959DAD"
          radius
          onPress={this.loadFromCameraRoll}
          title="GALERÍA"
        />
      </ActionsModal>
    );
  };

  render() {
    const { global, actions, reducer } = this.props;
    const { fullname, contact_number, profileImage } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <ScrollView keyboardShouldPersistTaps="always">
            <AvatarContainer>
              <Avatar
                size={100}
                rounded
                source={
                  profileImage !== null
                    ? { uri: profileImage.uri }
                    : global.user.uri_img !== ''
                    ? { uri: global.user.uri_img }
                    : require('../../assets/images/user_profile.png')
                }
                showEditButton
                onPress={() => this.setState({ selectImageVisible: true })}
              />
            </AvatarContainer>
            <Card>
              <ListItem
                subtitleStyle={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: '#454F63'
                }}
                titleStyle={{
                  fontSize: 12,
                  color: '#78849E',
                  marginBottom: 8
                }}
                title="NOMBRE DE USUARIO"
                subtitle={global.user.username}
                bottomDivider
                containerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  backgroundColor: 'transparent'
                }}
              />
              <ListItem
                subtitleStyle={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: '#454F63'
                }}
                titleStyle={{
                  fontSize: 12,
                  color: '#78849E',
                  marginBottom: 8
                }}
                title="EMAIL"
                subtitle={global.user.email}
                bottomDivider
                containerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  backgroundColor: 'transparent'
                }}
              />
              <ListItem
                subtitleStyle={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: '#454F63'
                }}
                titleStyle={{
                  fontSize: 12,
                  color: '#78849E',
                  marginBottom: 8
                }}
                title="FECHA DE REGISTRO"
                subtitle={getDateToString(new Date(global.user.register_date))}
                bottomDivider
                containerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  backgroundColor: 'transparent'
                }}
              />
              <ListItem
                titleStyle={{
                  fontSize: 12,
                  color: '#78849E'
                }}
                title="NOMBRE COMPLETO"
                chevron
                containerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  backgroundColor: 'transparent'
                }}
                input={{
                  value: fullname,
                  onChangeText: this.onChangeFullname,
                  inputStyle: {
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#454F63',
                    autoCapitalize: 'words'
                  }
                }}
              />
              {global.user.type === CARRIER_USER_TYPE && (
                <ListItem
                  subtitleStyle={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#454F63'
                  }}
                  titleStyle={{
                    fontSize: 12,
                    color: '#78849E',
                    marginBottom: 8
                  }}
                  title="NÚMERO DE CONTACTO"
                  bottomDivider
                  input={{
                    value: contact_number,
                    onChangeText: this.onChangeContactNumber
                  }}
                  containerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    backgroundColor: 'transparent'
                  }}
                />
              )}
            </Card>
          </ScrollView>
          <ButtonContainer>
            <Button
              width="250px"
              radius
              color="#665EFF"
              title="GUARDAR CAMBIOS"
              onPress={() => {
                const request = {
                  uid: global.user.uid,
                  type: global.user.type,
                  fullname,
                  contact_number,
                  profileImage
                };
                const val = validate(request, validations, { format: 'flat' });
                if (val === undefined) {
                  actions.editProfileRequest(request);
                } else {
                  DropDownHelper.alert('error', 'Error', val[0]);
                }
              }}
              loading={reducer.isEditProfileFetching}
              disabled={reducer.isEditProfileFetching}
            />
          </ButtonContainer>
          <View style={{ flex: 1 }} />
          {this.renderSelectImageOptions()}
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.editProfileReducer,
    global: state.globalReducer
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
)(EditProfile);
