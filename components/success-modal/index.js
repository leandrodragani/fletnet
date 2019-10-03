import React from 'react';
import { Dimensions } from "react-native";
import { DangerZone } from 'expo';
import { SuccessContainer, SuccessTitleText, SuccessSubtitleText, ButtonContainer } from './styles';
import { Button } from '../button';
import { Modal } from '../modal';

const { Lottie } = DangerZone;

export class SuccessModal extends React.Component {

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this.playAnimation();
    }
  }

  playAnimation = () => {
    if (this.a) {
      this.a.play();
    }
  };


  render() {
    const {
      onAcceptPress,
      visible,
      onRequestClose,
      title,
      subtitle
    } = this.props;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose} header={false}>
        <SuccessTitleText>{title}</SuccessTitleText>
        <SuccessContainer>
          <Lottie
            ref={(a) => {
              this.a = a;
            }}
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            loop={false}
            source={require('../../assets/checked-done.json')}
          />
          <SuccessSubtitleText>{subtitle}</SuccessSubtitleText>
        </SuccessContainer>
        <ButtonContainer>
          <Button
            width={Dimensions.get('window').width - 40}
            color="#665EFF"
            radius
            onPress={onAcceptPress}
            title="CONTINUAR"
          />
        </ButtonContainer>
      </Modal>
    );
  }
}
