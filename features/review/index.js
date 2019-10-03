import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, KeyboardAvoidingView, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import { Actions } from './actions';
import { LanguageHelper } from '../../utils/helpers/language';
import { Button } from '../../components/button';
import { SuccessModal } from '../../components/success-modal';
import { ButtonContainer, ReviewSubtitleText, ReviewTitleText, ReviewTextInput } from './styles';
import { DismissKeyboard } from '../../components/dismiss-keyboard';
import { Container } from '../../components/container';

class Review extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  onReviewChange = (text) => {
    this.setState({ message: text });
  };

  successModal = () => {
    const { navigation, reducer } = this.props;

    return (
      <SuccessModal
        visible={reducer.isReviewSuccess}
        onAcceptPress={() => navigation.navigate('Profile')}
        onRequestClose={() => navigation.navigate('Profile')}
        title="¡Tu mensaje fue enviado correctamente!"
        subtitle="Gracias, tu opinión nos ayuda a mejorar día a día"
      />
    );
  };

  render() {
    const { message } = this.state;
    const { reducer, actions, global } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <DismissKeyboard>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <ReviewTitleText>Envianos tu opinión</ReviewTitleText>
                <ReviewSubtitleText>
                  Tu opinión ayuda a mejorar la experiencia de la comunidad FletON. {'\n\n'}
                  Dejános tu mensaje debajo, ya sea por una sugerencia, mejora o para informar
                  acerca de un error.
                </ReviewSubtitleText>
                <ReviewTextInput
                  placeholder="Ingresar mensaje..."
                  keyboardType="default"
                  onChangeText={this.onReviewChange}
                  value={message}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoFocus
                />
                <ButtonContainer>
                  <View>
                    <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 10 }} />
                    <Button
                      width={Dimensions.get('window').width - 40}
                      radius
                      color="#665EFF"
                      title="ENVIAR MENSAJE"
                      loading={reducer.isReviewFetching}
                      disabled={reducer.isReviewFetching}
                      onPress={() => {
                        actions.reviewRequest({
                          comments: message,
                          email: global.user.email
                        });
                      }}
                    />
                  </View>
                </ButtonContainer>
              </View>
            </View>
          </DismissKeyboard>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.reviewReducer,
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
)(Review);
