import React from 'react';
import { View, KeyboardAvoidingView, Dimensions, Platform } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';
import { Actions } from './actions';
import { TextInput, Caption, ButtonContainer2, HeaderTitle } from './styles';
import { Container } from '../../components/container';
import { Button } from '../../components/button';
import { SuccessModal } from '../../components/success-modal';
import { LanguageHelper } from '../../utils/helpers/language';
import { DismissKeyboard } from '../../components/dismiss-keyboard';
import { getQuestionsRequest } from '../order-detail/actions';

class AnswerQuestion extends React.Component {
  static navigationOptions = {
    title: 'Responder pregunta',
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 0,
      borderBottomWidth: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      answer: ''
    };
  }

  onChangeAnswer = (text) => {
    this.setState({ answer: text });
  };

  successModal = () => {
    const { navigation, reducer, actions } = this.props;

    return (
      <SuccessModal
        visible={reducer.success}
        onAcceptPress={() => {
          navigation.push('OrderDetail', { orderID: navigation.state.params.orderID });
          actions.clearState({});
        }}
        onRequestClose={() => {
          navigation.push('OrderDetail', { orderID: navigation.state.params.orderID });
          actions.clearState({});
        }}
        title="Tu respuesta fue enviada"
        subtitle="Presiona CONTINUAR para volver"
      />
    );
  };

  render() {
    const { reducer, actions, navigation, global } = this.props;
    const { answer } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Header.HEIGHT}
      >
        <Container>
          <DismissKeyboard>
            <View style={{ flex: 1 }}>
              <HeaderTitle>{navigation.state.params.question}</HeaderTitle>
              <TextInput
                placeholder="Escribe tu respuesta..."
                onChangeText={this.onChangeAnswer}
                value={answer}
                returnKeyType="done"
                accessibilityLabel="textInputAnswer"
                maxLength={120}
                placeholderTextColor="#959DAD"
                autoFocus
              />
              <Caption>{`${answer.length} de 120 caracteres`}</Caption>
              <ButtonContainer2>
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
                    title="ENVIAR"
                    color="#665EFF"
                    onPress={() => {
                      actions.sendAnswerRequest({
                        orderID: navigation.state.params.orderID,
                        questionID: navigation.state.params.questionID,
                        sender: navigation.state.params.sender,
                        answer,
                        uid: global.user.uid
                      });
                    }}
                    disabled={answer.length === 0 && reducer.isFetching}
                    loading={reducer.isFetching}
                  />
                </View>
              </ButtonContainer2>
            </View>
          </DismissKeyboard>
        </Container>
        {this.successModal()}
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.answerQuestionReducer,
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
)(AnswerQuestion);
