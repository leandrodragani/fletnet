import React, { Fragment } from 'react';
import { ActivityIndicator } from 'react-native';
import { Camera as ExpoCamera, Permissions, ImageManipulator } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DropDownHelper } from '../../utils/helpers/dropdown';
import {
  CameraButtonsContainer,
  CloseButton,
  FlipButton,
  TakeButton,
  LoadingContainer
} from './styles';
import { Container } from '../container';

export class Camera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: ExpoCamera.Constants.Type.back,
    loading: true
  };

  async componentDidMount() {
    const { status: status_camera_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status: status_camera } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status_camera === 'granted' && status_camera_roll === 'granted' });
  }

  render() {
    const { hasCameraPermission, type, loading } = this.state;
    const { onCloseButton, onTakeButton } = this.props;

    // if (hasCameraPermission === null) {
    //   DropDownHelper.alert(
    //     'error',
    //     'Error',
    //     'Ocurrió un error al intentar iniciar la cámara. Comprobá que los permisos estén activados.'
    //   );
    // }
    if (hasCameraPermission === false) {
      DropDownHelper.alert(
        'error',
        'Error',
        'Ocurrió un error al intentar iniciar la cámara. Comprobá que los permisos estén activados.'
      );
    }

    return (
      <Container>
        <ExpoCamera
          ref={(ref) => { this.camera = ref; }}
          style={{ flex: 1 }}
          type={type}
          onCameraReady={() => this.setState({ loading: false })}
        >
          <CameraButtonsContainer>
            <FlipButton
              onPress={() => {
                this.setState({
                  type:
                    type === ExpoCamera.Constants.Type.back
                      ? ExpoCamera.Constants.Type.front
                      : ExpoCamera.Constants.Type.back
                });
              }}
            >
              <MaterialCommunityIcons name="reload" color="white" size={40} />
            </FlipButton>
            <TakeButton
              onPress={async () => {
                if (this.camera) {
                  this.setState({ loading: true });
                  const photo = await this.camera.takePictureAsync();
                  const resizedPhoto = await ImageManipulator.manipulateAsync(
                    photo.uri,
                    [{ resize: { width: 700 } }],
                    { compress: 0.6, format: 'jpg', base64: false }
                  );
                  this.setState({ loading: false });
                  onTakeButton(resizedPhoto);
                }
              }}
            >
              <MaterialCommunityIcons
                name="circle-slice-8"
                color="white"
                size={80}
              />
            </TakeButton>
            <CloseButton onPress={onCloseButton}>
              <MaterialCommunityIcons name="close" color="white" size={40} />
            </CloseButton>
          </CameraButtonsContainer>
        </ExpoCamera>
      </Container>
    );
  }
}
