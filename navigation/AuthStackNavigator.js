import { createStackNavigator } from 'react-navigation';
import Login from '../features/login';
import SignUp from '../features/sign-up';
import Terms from '../features/terms';
import ForgotPassword from '../features/forgot-password';
import CarrierDocumentation from '../features/carrier-documentation';

export default createStackNavigator({
  LoginScreen: Login,
  SignUpScreen: SignUp,
  TermsScreen: Terms,
  ForgotPasswordScreen: ForgotPassword,
  ...CarrierDocumentation
});
