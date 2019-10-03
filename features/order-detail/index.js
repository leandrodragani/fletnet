import React from 'react';
import { ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from '../../components/container';
import { Trip } from '../../components/trip';
import { QuestionsList } from './components/questions-list';
import { Widget } from './components/widget';
import { Button } from '../../components/button';
import {
  ButtonsContainer,
  ActivityIndicatorContainer,
  HeaderTitle,
  HeaderTitleContainer,
  WidgetsContainer,
  Card,
  Label
} from './styles';
import { getVehicleTypeText } from '../../utils/vehicle-utils';
import { Actions } from './actions';
import { QuestionModal } from './components/question-modal';
import { QuestionsListModal } from './components/questions-list-modal';
import { SuccessModal } from '../../components/success-modal';
import { CARRIER_USER_TYPE } from '../../utils/constants/users';
import { ORDER_TYPE_EXPRESS } from '../../utils/constants/orders';

class OrderDetail extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: { backgroundColor: '#2A2E43', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      questionListVisible: false,
      successModal: true
    };
  }

  componentDidMount() {
    const { actions, navigation, reducer } = this.props;
    const orderId = navigation.state.params.orderID;
    if (reducer.lastFetched !== orderId) {
      actions.orderDetailRequest({ orderId });
    }
    actions.getQuestionsRequest({ orderId });
  }

  onChangeQuestion = (text) => {
    this.setState({ question: text });
  };

  successModal = () => {
    const { navigation, reducer, actions } = this.props;
    const { successModal } = this.state;

    return (
      <SuccessModal
        visible={reducer.performServiceSuccess && successModal}
        onAcceptPress={() => {
          this.setState({ successModal: false });
          actions.clearState({});
          navigation.push('OrderTracking', { orderId: navigation.state.params.orderID });
        }}
        onRequestClose={() => {
          this.setState({ successModal: false });
          actions.clearState({});
          navigation.push('OrderTracking', { orderId: navigation.state.params.orderID });
        }}
        title="¡Asignación del pedido correcta!"
        subtitle="Ahora podrás seguir el seguimiento del pedido precionando Aceptar."
      />
    );
  };

  questionModal = () => {
    const { question } = this.state;
    const { actions, reducer, global, navigation } = this.props;

    return (
      <QuestionModal
        visible={reducer.questionVisible}
        question={question}
        onRequestClose={() => actions.toggleQuestionModal()}
        onChangeQuestion={this.onChangeQuestion}
        onAskPress={() => {
          actions.makeQuestionRequest({
            clientId: reducer.order.uid,
            orderTitle: reducer.order.title,
            question,
            orderId: navigation.state.params.orderID,
            carrierId: global.user.uid,
            carrierUsername: global.user.username
          });
        }}
        loading={reducer.isSendingQuestion}
      />
    );
  };

  questionsListModal = () => {
    const { questionListVisible } = this.state;
    const { reducer, global, actions, navigation } = this.props;

    return (
      <QuestionsListModal
        visible={questionListVisible}
        onRequestClose={() => this.setState({ questionListVisible: false })}
        questions={reducer.questions}
        onPress={() => {
          actions.toggleQuestionModal();
          this.setState({ questionListVisible: false });
        }}
        usertype={global.user.type}
        orderID={navigation.state.params.orderID}
        onPressQuestion={(item) => {
          navigation.navigate('AnswerQuestion', item);
          this.setState({ questionListVisible: false });
        }}
      />
    );
  };

  render() {
    const { reducer, global, actions, navigation } = this.props;
    return (
      <Container>
        <HeaderTitleContainer>
          <HeaderTitle>{reducer.order.title}</HeaderTitle>
        </HeaderTitleContainer>
        {reducer.isFetching ? (
          <ActivityIndicatorContainer>
            <ActivityIndicator />
          </ActivityIndicatorContainer>
        ) : (
          <ScrollView>
            {/* <OrderSubtitleText>{`Para el ${reducer.order.order_date} a las ${reducer.order.since_time}`}</OrderSubtitleText> */}
            <WidgetsContainer>
              <Widget
                icon="ios-car"
                label="Vehiculo requerido"
                value={getVehicleTypeText(reducer.order.vehicleType)}
              />
              <Widget icon="ios-cash" label="Ganancia" value={`$ ${reducer.order.value}`} />
              <Widget
                value={reducer.order.order_date}
                label="Fecha a realizar"
                icon="ios-calendar"
              />
              <Widget
                value={`${reducer.order.since_time} hs`}
                label="A partir de"
                icon="ios-navigate"
              />
              <Widget
                value={
                  reducer.order.until_time === '' ? 'A elección' : `${reducer.order.until_time} hs`
                }
                label="Horario limite"
                icon="ios-timer"
              />
              <Widget icon="ios-timer" label="Duración" value={reducer.order.duration} />
              <Widget icon="ios-map" label="Recorrido" value={reducer.order.distance} />
              <Widget
                icon="md-person"
                label="Con asistente"
                value={reducer.order.assistant ? 'Sí' : 'No'}
              />
              <Widget
                icon="ios-return-left"
                label="Retorno"
                value={reducer.order.withReturn ? 'Sí' : 'No'}
              />
            </WidgetsContainer>
            <Label>VIAJE</Label>
            <Card>
              {reducer.order.origin !== undefined && (
                <Trip
                  origin={reducer.order.origin}
                  destinations={
                    reducer.order.type === ORDER_TYPE_EXPRESS
                      ? [reducer.order.destination]
                      : reducer.order.waypoints
                  }
                />
              )}
            </Card>
            <Label>PREGUNTAS</Label>
            <Card>
              <QuestionsList
                questions={reducer.questions}
                usertype={global.user.type}
                onPress={() => this.setState({ questionListVisible: true })}
                orderID={navigation.state.params.orderID}
              />
            </Card>
            {global.user.type === CARRIER_USER_TYPE ? (
              <ButtonsContainer>
                <Button
                  width={Dimensions.get('window').width - 25}
                  color="#665EFF"
                  radius
                  onPress={() => {
                    Alert.alert(
                      'Información',
                      'Realizar el envío es un compromiso, en caso de no hacerlo, se aplicará una multa junto con el precio del pedido.',
                      [
                        {
                          text: 'Cancelar',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel'
                        },
                        {
                          text: 'Aceptar',
                          onPress: () => {
                            actions.performServiceRequest({
                              value: reducer.order.value,
                              orderID: navigation.state.params.orderID,
                              carrier: global.user,
                              clientUID: reducer.order.uid,
                              orderTitle: reducer.order.title,
                              vehicleType: reducer.order.vehicleType
                            });
                          }
                        }
                      ]
                    );
                  }}
                  title="REALIZAR SERVICIO"
                  loading={reducer.isSendingPerformService}
                />
              </ButtonsContainer>
            ) : (
              <ButtonsContainer>
                <Button
                  width={Dimensions.get('window').width - 25}
                  color="#665EFF"
                  radius
                  onPress={() => {
                    navigation.navigate('OrderCancel', {
                      orderID: navigation.state.params.orderID,
                      trackingStatus: null
                    });
                  }}
                  title="CANCELAR PEDIDO"
                />
              </ButtonsContainer>
            )}
          </ScrollView>
        )}
        {this.questionModal()}
        {this.questionsListModal()}
        {this.successModal()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.orderDetailReducer,
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
)(OrderDetail);
