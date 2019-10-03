import React from 'react';
import { Dimensions, View, KeyboardAvoidingView } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';
import { Container } from '../../components/container';
import { Button } from '../../components/button';
import { Actions } from './actions';
import { Selectors } from './selectors';
import { DropDownHelper } from '../../utils/helpers/dropdown';
import { ForgotPasswordButtonContainer, HeaderTitle, TextInput, Caption } from './styles';
import { LanguageHelper } from '../../utils/helpers/language';
import { DismissKeyboard } from '../../components/dismiss-keyboard';

class ForgotPassword extends React.Component {
  static navigationOptions = () => ({
    title: ' ',
    headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
  });

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  onChangeEmail = (text) => {
    this.setState({ email: text });
  };

  onSubmit = () => {
    const { email } = this.state;
    const { actions } = this.props;
    if (email !== '') {
      actions.userForgotPasswordRequest({ email });
    } else {
      DropDownHelper.alert('error', 'Error', LanguageHelper.getLanguage().empty_fields_message);
    }
  };

  render() {
    const { email } = this.state;
    const { isFetching } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Container>
          <DismissKeyboard>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <HeaderTitle>Recuperar contraseña</HeaderTitle>
                <Caption>{LanguageHelper.getLanguage().forgot_password_caption}</Caption>
                <TextInput
                  placeholder={LanguageHelper.getLanguage().email_placeholder}
                  onChangeText={this.onChangeEmail}
                  value={email}
                  keyboardType="email-address"
                  returnKeyType="send"
                  accessibilityLabel="textInputForgotPassword"
                  autoFocus
                />
              </View>
              <View style={{ flex: 1 }} />
              <ForgotPasswordButtonContainer>
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
                    title="CONTINUAR"
                    color="#665EFF"
                    onPress={this.onSubmit}
                    loading={isFetching}
                    disabled={isFetching}
                  />
                </View>
              </ForgotPasswordButtonContainer>
            </View>
          </DismissKeyboard>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: Selectors.isFetchingSelector(state)
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
)(ForgotPassword);
