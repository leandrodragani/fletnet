import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '../../components/button';
import {
  ButtonContainer,
  SignatureContainer
} from './styles';
import SignatureScreen from 'react-native-signature-canvas';
import { Actions } from './actions';
import { LanguageHelper } from '../../utils/helpers/language';
import { Container } from '../../components/container';
import { DropDownHelper } from '../../utils/helpers/dropdown';
import { SuccessModal } from '../../components/success-modal';

class Signature extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Firma digital'
  });

  constructor(props) {
    super(props);
    this.state = {
      signature: null
    };
  }

  handleSignature = (signature) => {
    if (signature === '') {
      DropDownHelper.alert(
        'error',
        'Firma no válida',
        'La firma no puede estar vacía.'
      );
    } else {
      this.setState({ signature });
    }
  };

  renderSuccess = () => {
    const { navigation, reducer, actions } = this.props;
    return (
      <SuccessModal
        visible={reducer.isSignatureSuccess}
        onAcceptPress={() => { actions.closeModalSignatureSuccess(), navigation.goBack() }}
        onRequestClose={() => { actions.closeModalSignatureSuccess(), navigation.goBack() }}
        title="¡Completado!"
        subtitle="La firma del cliente ha sido registrada"
      />
    );
  };

  render() {
    const { signature } = this.state;
    const { reducer, actions, navigation, global } = this.props;
    return (
      <Container>
        <SignatureContainer>
          {signature && (
            <Image
              resizeMode="contain"
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          )}
        </SignatureContainer>
        <ButtonContainer>
          <Button
            width="250px"
            radius
            onPress={() => {
              if (!signature) {
                DropDownHelper.alert(
                  'error',
                  'Firma no válida',
                  'La firma no puede estar vacía.'
                );
              } else {
                actions.saveSignatureRequest({
                  order_id: navigation.state.params.orderID,
                  title: navigation.state.params.title,
                  client_uid: navigation.state.params.client_uid,
                  carrier_uid: global.user.uid,
                  fullname: navigation.state.params.fullname,
                  signature
                });
              }
            }}
            title="Finalizar"
            disabled={reducer.isFetching}
            loading={reducer.isFetching}
          />
        </ButtonContainer>
        <SignatureScreen
          onOK={this.handleSignature}
          descriptionText="Firma del cliente"
          clearText="Limpiar"
          confirmText="Guardar"
        />
        {this.renderSuccess()}
      </Container>
    );
  }
}

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
