import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { AppLoading, Font, Icon, DangerZone } from 'expo';
import { Provider } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator';
import { store } from './redux/store';
import { Container } from './components/container';
import { DropDownHelper } from './utils/helpers/dropdown';
import FirebaseConfiguration from './config/firebase';
import { LanguageHelper } from './utils/helpers/language';
import { setNavigator } from './utils/helpers/navigation';

const { Localization } = DangerZone;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  setLanguage = async () =>
    Localization.getLocalizationAsync().then((currentLocale) => {
      LanguageHelper.setLanguage(currentLocale);
    });

  loadResourcesAsync = async () => {
    await this.setLanguage();
    await firebase.initializeApp(FirebaseConfiguration);
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ]);
  };

  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Container>
        <Provider store={store}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator
            ref={(nav) => {
              setNavigator(nav);
            }}
          />
          <DropdownAlert
            ref={(ref) => DropDownHelper.setDropDown(ref)}
            closeInterval={5000}
            startDelta={-72}
            endDelta={22}
            errorColor="#ff5148"
            successColor="#3497FD"
          />
        </Provider>
      </Container>
    );
  }
}
