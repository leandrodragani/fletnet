import React from 'react';
import { Platform, FlatList, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'expo';
import { bindActionCreators } from 'redux';
import { ListItem, Divider } from 'react-native-elements';
import { Container } from '../../components/container';
import { Actions } from './actions';
import { LanguageHelper } from '../../utils/helpers/language';
import { SuccessModal } from '../../components/success-modal';

class Payment extends React.Component {
  static navigationOptions = {
    title: 'Métodos de pago',
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

  successModal = () => {
    const { navigation, reducer, actions } = this.props;

    return (
      <SuccessModal
        visible={reducer.isPublishingSuccess}
        onAcceptPress={() => { actions.clearState({}), navigation.navigate('Orders') }}
        onRequestClose={() => { actions.clearState({}), navigation.navigate('Orders') }}
        title="¡Tu pedido fue publicado correctamente!"
        subtitle="Te avisaremos cuando un transportista esté en camino, podés ver el detalle desde Pedidos"
      />
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      methods: [
        {
          key: '1', title: 'Pago en efectivo', onPress: () => {
            Alert.alert(
              'Información',
              'Publicar un pedido es un compromiso, ¿Estás seguro que querés continuar?',
              [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
                {
                  text: 'Aceptar',
                  onPress: () => this.props.actions.addOrderRequest({
                    uid: this.props.global.user.uid,
                    title: this.props.navigation.state.params.title,
                    origin: this.props.navigation.state.params.origin,
                    destinations: this.props.navigation.state.params.destinations,
                    orderAssistant: this.props.navigation.state.params.orderAssistant,
                    sinceTime: this.props.navigation.state.params.sinceTime,
                    untilTime: this.props.navigation.state.params.untilTime,
                    orderDate: this.props.navigation.state.params.orderDate,
                    withReturn: this.props.navigation.state.params.withReturn,
                    vehicleType: this.props.navigation.state.params.vehicleType,
                    orderSummary: this.props.navigation.state.params.orderSummary,
                    paymentMethod: 'cash'
                  })
                }
              ]
            )
          }, icon: <Icon.Ionicons name="ios-cash" color="#665EFF" size={20} />
        }/*,
        { key: '2', title: 'Pago con tarjeta', onPress: () => console.log('asd'), icon: <Icon.Ionicons name="ios-card" color="#1763aa" size={20} /> },*/
      ]
    };
  }

  render() {
    const { reducer, actions, global } = this.props;
    const { methods } = this.state;

    return (
      <Container>
        <FlatList
          data={methods}
          removeClippedSubviews={Platform.OS === 'android'}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 10 }} />}
          renderItem={({ item }) => (
            <ListItem
              titleStyle={{ fontSize: 16, fontWeight: 'normal', color: '#454F63' }}
              title={item.title}
              chevron
              leftIcon={item.icon}
              containerStyle={{
                paddingHorizontal: 15,
                marginVertical: 10
              }}
              onPress={item.onPress}
              loading={reducer.isPublishing}
              disabled={reducer.isPublishing}
              Component={TouchableOpacity}
            />
          )}
          keyExtractor={item => item.key}
        />
        {this.successModal()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.paymentReducer,
    global: state.globalReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
