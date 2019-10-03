import React, { Component } from 'react';
import Expo, { DangerZone } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ExpoPixi from 'expo-pixi';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../components/button';
import { SuccessModal } from '../../components/success-modal';
import { Container, ButtonContainer, Label } from './styles';
import { Actions } from './actions';

const { Lottie } = DangerZone;

class Signature extends Component {
  static navigationOptions = {
    title: 'Firma digital',
    headerTitleStyle: { color: '#454F63' },
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 6,
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      animation: true
    };
  }

  componentDidMount() {
    this.playAnimation();
  }

  playAnimation = () => {
    if (this.a) {
      this.a.play();
    }
  };

  onReady = () => {
    console.log('ready!');
  };

  successModal = () => {
    const { navigation, reducer } = this.props;

    return (
      <SuccessModal
        visible={reducer.isSignatureSuccess}
        onAcceptPress={() => { actions.closeModalSignatureSuccess(); navigation.goBack(); }}
        onRequestClose={() => { actions.closeModalSignatureSuccess(); navigation.goBack(); }}
        title="¡Pedido entregado!"
        subtitle="Gracias por utilizar nuestro servicio"
      />
    );
  };

  showAnimation = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => this.setState({ animation: false })}
      >
        <Lottie
          ref={a => this.a = a }
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          source={require('../../assets/pencil-animation.json')}
        />
        <Label>
          Necesitamos la firma de tu cliente para saber que recibió
          correctamente su pedido, toca la pantalla para empezar.
        </Label>
      </TouchableOpacity>
    </View>
  );

  saveCanvas = async () => {
    const result = await this.sketch.takeSnapshotAsync({
      format: 'jpeg',
      quality: 0.1,
    });

    console.log(result.uri);
  };

  render() {
    const { animation } = this.state;
    const { reducer } = this.props;

    return animation ? (
      this.showAnimation()
    ) : (
      <Container>
        <Container>
          <View style={styles.sketchContainer}>
            <ExpoPixi.Signature
              ref={ref => (this.sketch = ref)}
              style={styles.sketch}
              strokeAlpha={1}
              onReady={this.onReady}
            />
          </View>
        </Container>
        <ButtonContainer>
          <Button
            width={Dimensions.get('window').width / 2 - 30}
            color="#444F63"
            radius
            title="DESHACER"
            onPress={() => {
              this.sketch.clear();
            }}
          />
          <Button
            width={Dimensions.get('window').width / 2 - 30}
            color="#ff7043"
            radius
            onPress={this.saveCanvas}
            title="FIRMAR ENTREGA"
            loading={reducer.isFetching}
          />
        </ButtonContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  sketch: {
    flex: 1
  },
  sketchContainer: {
    height: '100%'
  },
});

function mapStateToProps(state) {
  return {
    reducer: state.signatureReducer,
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
)(Signature);
