import React from 'react';
import firebase from 'firebase';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../redux/global/actions';
import { getUser } from '../../api/loginService';
import { CLIENT_USER_TYPE, CARRIER_USER_TYPE } from '../../utils/constants/users';
import { DropDownHelper } from '../../utils/helpers/dropdown';

class AuthLoading extends React.Component {
  componentDidMount() {
    const { actions, navigation } = this.props;
    const listener = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setUser(user.uid);
      } else {
        navigation.navigate('Auth');
      }
    });
    actions.setVerifyAuthListener(listener);
  }

  setUser = async (uid) => {
    const { actions, navigation } = this.props;
    const user = await getUser(uid);
    if (user !== null) {
      if (user.type === CARRIER_USER_TYPE && !user.vehicle.validate) {
        navigation.navigate('Auth');
        DropDownHelper.alert(
          'warn',
          'Pendiente',
          'Estamos validando sus datos. Por favor, aguarde que nuestros analistas lo aprueben.'
        );
      } else {
        actions.setUser(user);
        if (user.type === CLIENT_USER_TYPE) {
          navigation.navigate('ClientTabNavigator');
        } else {
          navigation.navigate('CarrierTabNavigator');
        }
      }
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="black" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.globalReducer
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
)(AuthLoading);
