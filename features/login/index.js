import React from 'react';
import { Dimensions, KeyboardAvoidingView, Alert, View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Google } from 'expo';
import { Container } from '../../components/container';
import { Button } from '../../components/button';
import { HeaderLogo } from './components/header-logo';
import { ForgotPasswordNav } from './components/forgot-password';
import { SignUpNav } from './components/signup';
import { LoginButtonContainer, TextInput, Center } from './styles';
import { DropDownHelper } from '../../utils/helpers/dropdown';
import { Actions } from './actions';
import { Selectors } from './selectors';
import { LanguageHelper } from '../../utils/helpers/language';
import { DismissKeyboard } from '../../components/dismiss-keyboard';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '../../utils/constants/keys';
import ButtonLogo from '../../components/ButtonLogo';

class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChangeEmail = (text) => {
    this.setState({ email: text });
  };

  onChangePassword = (text) => {
    this.setState({ password: text });
  };

  onSubmit = () => {
    const { email, password } = this.state;
    const { actions } = this.props;

    if (email && password) {
      actions.userLoginRequest({ username: email, password });
    } else {
      DropDownHelper.alert('error', 'Error', LanguageHelper.getLanguage().empty_fields_message);
    }
  };

  render() {
    const { email, password } = this.state;
    const { isFetching, isFetchingGoogle, actions, navigation } = this.props;
    return (
      <Container>
        <DismissKeyboard>
          <Center>
            <HeaderLogo logo={require('../../assets/images/icon.png')} />
            <KeyboardAvoidingView behavior="padding">
              <TextInput
                placeholder={LanguageHelper.getLanguage().email_placeholder}
                onChangeText={this.onChangeEmail}
                value={email}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
              />
              <TextInput
                ref={(ref) => (this.passwordInput = ref)}
                placeholder={LanguageHelper.getLanguage().password_placeholder}
                onChangeText={this.onChangePassword}
                value={password}
                returnKeyType="done"
                secureTextEntry
                onSubmitEditing={() => actions.userLoginRequest({ username: email, password })}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
              />
            </KeyboardAvoidingView>
            <ForgotPasswordNav onPress={() => navigation.navigate('ForgotPasswordScreen')} />
            <LoginButtonContainer>
              <Button
                width={Dimensions.get('window').width - 50}
                color="#665EFF"
                radius
                title="INICIAR SESIÓN"
                onPress={this.onSubmit}
                loading={isFetching}
                disabled={isFetching || isFetchingGoogle}
              />
            </LoginButtonContainer>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10
                }}
              >
                <ButtonLogo
                  marginVertical={0}
                  text="Facebook"
                  icon="logo-facebook"
                  iconSize={20}
                  iconColor="#3C5A99"
                  iconType="Ionicons"
                  colorText="#3C5A99"
                  width={145}
                  height={50}
                  color="transparent"
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10
                }}
              >
                <ButtonLogo
                  marginVertical={0}
                  text="Google"
                  icon="logo-google"
                  iconSize={20}
                  iconColor="#D44638"
                  iconType="Ionicons"
                  width={145}
                  height={50}
                  color="transparent"
                  colorText="#D44638"
                  loading={isFetchingGoogle}
                  disabled={isFetching || isFetchingGoogle}
                  onPress={async () => {
                    Alert.alert(
                      'Atención',
                      'El inicio de sesión con Google es solo para usuarios de tipo CLIENTE.',
                      [
                        {
                          text: 'Cancelar',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel'
                        },
                        {
                          text: 'Quiero ingresar como cliente',
                          onPress: async () => {
                            const result = await Google.logInAsync({
                              androidClientId: GOOGLE_ANDROID_CLIENT_ID,
                              iosClientId: GOOGLE_IOS_CLIENT_ID,
                              scopes: ['profile', 'email']
                            });
                            actions.userGoogleLoginResponse(result);
                          }
                        }
                      ]
                    );
                  }}
                />
              </View>
            </View>
          </Center>
        </DismissKeyboard>
        <SignUpNav onPress={() => navigation.navigate('SignUpScreen')} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: Selectors.isFetchingSelector(state),
    isFetchingGoogle: Selectors.isFetchingGoogleSelector(state)
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
)(Login);
