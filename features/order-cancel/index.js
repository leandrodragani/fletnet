import React from 'react';
import { Alert, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from './actions';
import {
  CancelTitleText,
  CancelSubtitleText,
  ButtonContainer
} from './styles';
import { Button } from '../../components/button';
import { Container } from '../../components/container';
import { SuccessModal } from '../../components/success-modal';
import { LanguageHelper } from '../../utils/helpers/language';

class OrderCancel extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: { backgroundColor: '#FFFFFF', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  successModal = () => {
    const { navigation, reducer } = this.props;

    return (
      <SuccessModal
        visible={reducer.success}
        onAcceptPress={() => navigation.navigate('Orders')}
        onRequestClose={() => navigation.navigate('Orders')}
        title="Tu pedido fue cancelado"
        subtitle="Gracias por utilizar nuestro servicio"
      />
    );
  };

  render() {
    const { reducer, actions, navigation, global } = this.props;
    return (
      <Container>
        <CancelTitleText>Cancelación del pedido</CancelTitleText>
        <CancelSubtitleText>
          Tenga en cuenta que al cancelar el pedido se le podrán agregar cargos extras en pedidos futuros.
        </CancelSubtitleText>
        <ButtonContainer>
          <Button
            width={Dimensions.get('window').width - 40}
            color="#ff7043"
            radius
            onPress={() => Alert.alert(
              'Información',
              'Estás a punto de cancelar el pedido ¿Estás seguro que querés continuar?',
              [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
                {
                  text: 'Aceptar',
                  onPress: () => actions.orderCancelRequest({
                    orderID: navigation.state.params.orderID,
                    uid: global.user.uid,
                    trackingStatus: navigation.state.params.trackingStatus
                  })
                }
              ]
            )}
            title="CANCELAR PEDIDO"
            disabled={reducer.isFetching}
            loading={reducer.isFetching}
          />
        </ButtonContainer>
        {this.successModal()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.orderCancelReducer,
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
)(OrderCancel);
