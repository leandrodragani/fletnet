import React from 'react';
import {
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { validate } from 'validate.js';
import { UsertypeCheckBox } from './components/usertype-checkbox';
import {
  UsertypeCheckBoxContainer,
  SignUpButtonContainer,
  TextInput,
  Container,
} from './styles';
import { TermsNav } from './components/terms-nav';
import { DropDownHelper } from '../../utils/helpers/dropdown';
import { Actions } from './actions';
import { Selectors } from './selectors';
import validations from './validations';
import { LanguageHelper } from '../../utils/helpers/language';
import { Button } from '../../components/button';
import { DismissKeyboard } from '../../components/dismiss-keyboard';

class SignUp extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: { backgroundColor: '#2A2E43', elevation: 0, borderBottomWidth: 0, }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      fullname: '',
      usertype: ''
    };
  }

  onChangeEmail = (text) => {
    this.setState({ email: text });
  };

  onChangePassword = (text) => {
    this.setState({ password: text });
  };

  onChangeUsername = (text) => {
    this.setState({ username: text });
  };

  onChangeFullname = (text) => {
    this.setState({ fullname: text });
  };

  onUsertypeCheckClient = () => {
    this.setState({ usertype: 'C' });
  };

  onUsertypeCheckCarrier = () => {
    this.setState({ usertype: 'T' });
  };

  onSignUp = () => {
    const { email, password, username, fullname, usertype } = this.state;
    const { actions } = this.props;
    const request = {
      email,
      password,
      fullname,
      username,
      usertype
    };
    const val = validate(request, validations, { format: 'flat' });
    if (val === undefined) {
      actions.singUpRequest(request);
    } else {
      DropDownHelper.alert('error', 'Error', val[0]);
    }
  };

  navigateToTerms = () => {
    const { navigation } = this.props;
    navigation.navigate('TermsScreen');
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { email, password, username, fullname, usertype } = this.state;
    const { isFetching } = this.props;
    return (
      <DismissKeyboard>
        <Container>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              value={fullname}
              placeholder={LanguageHelper.getLanguage().fullname_placeholder}
              onChangeText={this.onChangeFullname}
              keyboardType="default"
              returnKeyType="next"
              maxLength={50}
              placeholderTextColor="#959DAD"
              onSubmitEditing={() => this.username.focus()}
              autoCapitalize="words"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
            <TextInput
              value={username}
              placeholderTextColor="#959DAD"
              ref={input => (this.username = input)}
              placeholder={LanguageHelper.getLanguage().username_placeholder}
              onChangeText={this.onChangeUsername}
              keyboardType="default"
              returnKeyType="next"
              maxLength={20}
              onSubmitEditing={() => this.email.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
            <TextInput
              value={email}
              ref={input => (this.email = input)}
              placeholderTextColor="#959DAD"
              placeholder={LanguageHelper.getLanguage().email_placeholder}
              onChangeText={this.onChangeEmail}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this.password.focus()}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
            <TextInput
              value={password}
              placeholderTextColor="#959DAD"
              ref={input => (this.password = input)}
              placeholder={LanguageHelper.getLanguage().password_placeholder}
              onChangeText={this.onChangePassword}
              returnKeyType="done"
              secureTextEntry
              maxLength={50}
              onSubmitEditing={() => Keyboard.dismiss()}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
          </KeyboardAvoidingView>
          <UsertypeCheckBoxContainer>
            <UsertypeCheckBox
              title={LanguageHelper.getLanguage().carrier_checkbox}
              uncheckedIcon="truck"
              checked={usertype === 'T'}
              uncheckedColor="#454F63"
              checkedIcon="truck"
              checkedIconColor="#665EFF"
              uncheckedIconColor="#454F63"
              onPress={this.onUsertypeCheckCarrier}
            />
            <UsertypeCheckBox
              title={LanguageHelper.getLanguage().client_checkbox}
              checked={usertype === 'C'}
              uncheckedIcon="user"
              uncheckedColor="#454F63"
              checkedIcon="user"
              checkedIconColor="#665EFF"
              uncheckedIconColor="#454F63"
              onPress={this.onUsertypeCheckClient}
            />
          </UsertypeCheckBoxContainer>
          <SignUpButtonContainer>
            <Button
              width={Dimensions.get('window').width - 50}
              color="#665EFF"
              radius
              title="CONTINUAR"
              onPress={this.onSignUp}
              loading={isFetching}
            />
            <TermsNav
              onPress={this.navigateToTerms}
              companyName={LanguageHelper.getLanguage().company_name}
            />
          </SignUpButtonContainer>
        </Container>
      </DismissKeyboard>
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
)(SignUp);
