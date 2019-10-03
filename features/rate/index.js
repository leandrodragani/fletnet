import React, { Fragment } from 'react';
import { ScrollView, Dimensions, View, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AirbnbRating, Divider } from 'react-native-elements';
import { Actions } from './actions';
import { Container } from '../../components/container';
import {
  ButtonContainer,
  AirbnbRatingContainer,
  TextInput,
  HeaderTitle,
  Card,
  Label
} from './styles';
import { OrderRated } from './components/order-rated';
import { UserRated } from './components/user-rated';
import { Button } from '../../components/button';
import { SuccessModal } from '../../components/success-modal';
import { LanguageHelper } from '../../utils/helpers/language';
import { CLIENT_USER_TYPE } from '../../utils/constants/users';
import { DismissKeyboard } from '../../components/dismiss-keyboard';

class Rate extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      rating: 5
    };
  }

  componentDidMount() {
    const { navigation, actions } = this.props;
    const user = navigation.getParam('user', '');
    actions.setUser(user);
  }

  onChangeMessage = (text) => {
    this.setState({ message: text });
  };

  successModal = () => {
    const { navigation, reducer, actions } = this.props;

    return (
      <SuccessModal
        visible={reducer.success}
        onAcceptPress={() => {
          actions.clearState();
          navigation.navigate('Orders');
        }}
        onRequestClose={() => navigation.navigate('Orders')}
        title="¡Tu calificación fue recibida!"
        subtitle="Gracias por calificar el servicio, esto permite ayudar a la comunidad y mejorar día a día."
      />
    );
  };

  render() {
    const { reducer, actions, navigation, global } = this.props;
    const { message, rating } = this.state;
    const order = navigation.getParam('order', {});
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <DismissKeyboard>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <HeaderTitle>Calificá el servicio</HeaderTitle>
                <Fragment>
                  <Label>
                    {global.user.type === CLIENT_USER_TYPE ? 'TU TRANSPORTISTA' : 'TU CLIENTE'}
                  </Label>
                  <Card>
                    <UserRated
                      image={
                        reducer.user.uri_img !== ''
                          ? { uri: reducer.user.uri_img }
                          : require('../../assets/images/user_profile.png')
                      }
                      title={reducer.user.fullname}
                      subtitle={
                        global.user.type === CLIENT_USER_TYPE
                          ? `${reducer.user.vehicle.brand} • ${reducer.user.vehicle.license_plate}`
                          : reducer.user.username
                      }
                    />
                  </Card>
                </Fragment>
                <Fragment>
                  <Label>TU PEDIDO</Label>
                  <Card>
                    <OrderRated
                      title={order.title}
                      subtitle={`${order.order_date} - ${order.since_time}`}
                    />
                  </Card>
                </Fragment>
                <AirbnbRatingContainer>
                  <AirbnbRating
                    reviews={['Muy malo', 'Malo', 'Bueno', 'Muy bueno', 'Excelente']}
                    defaultRating={5}
                    size={35}
                    showRating
                    onFinishRating={(number) => this.setState({ rating: number })}
                    ratingColor="#FF9057"
                  />
                </AirbnbRatingContainer>
                <TextInput
                  placeholder="¿Querés agregar un comentario adicional?"
                  keyboardType="default"
                  onChangeText={this.onChangeMessage}
                  value={message}
                  returnKeyType="done"
                  maxLength={80}
                  autoCapitalize="sentences"
                />
              </View>
              <ButtonContainer>
                <View>
                  <Divider
                    style={{
                      backgroundColor: 'gray',
                      opacity: 0.2,
                      marginVertical: 10
                    }}
                  />
                  <Button
                    width={Dimensions.get('window').width - 40}
                    color="#665EFF"
                    radius
                    loading={reducer.isFetching}
                    onPress={() =>
                      actions.userRateRequest({
                        userRatedUID: navigation.state.params.user.uid,
                        userUID: global.user.uid,
                        username: global.user.username,
                        message,
                        rating,
                        orderUID: navigation.state.params.order.id
                      })
                    }
                    title="ENVIAR CALIFICACION"
                  />
                </View>
              </ButtonContainer>
              {this.successModal()}
            </View>
          </DismissKeyboard>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.rateReducer,
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
)(Rate);
