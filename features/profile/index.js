import React from 'react';
import { Platform, FlatList, Share, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListItem } from 'react-native-elements';
import { Container } from '../../components/container';
import { UserProfileDetail } from './components/user-profile-detail';
import { Actions } from '../../redux/global/actions';
import { LanguageHelper } from '../../utils/helpers/language';
import { getDateToString } from '../../utils/date-utils';

class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          type: 'A',
          title: 'Mi reputación',
          icon: 'star',
          nav: 'UserProfile'
        },
        {
          type: 'A',
          title: 'Compartir',
          icon: 'whatsapp',
          nav: 'Share'
        },
        {
          type: 'A',
          title: 'Danos tu opinión',
          icon: 'send',
          nav: 'Review'
        },
        {
          type: 'A',
          title: 'Ayuda',
          icon: 'support',
          nav: 'Help'
        },
        {
          type: 'A',
          title: 'Cerrar sesión',
          icon: 'cog',
          nav: 'SignOut'
        }
      ]
    };
  }

  onShare = async () => {
    const playStoreLink = 'https://google.com.ar';
    const appStoreLink = 'https://google.com.ar';

    const response = Share.share({
      message: `Descargate la app y realiza pedidos! Play store: ${playStoreLink} AppStore: ${appStoreLink}`
    });
  };

  render() {
    const { menu } = this.state;
    const { global, navigation, actions } = this.props;
    return (
      <Container>
        <UserProfileDetail
          onPress={() => navigation.navigate('EditProfile')}
          username={global.user.username}
          registerDate={getDateToString(new Date(global.user.register_date))}
          image={
            global.user.uri_img === ''
              ? require('../../assets/images/user_profile.png')
              : { uri: global.user.uri_img }
          }
        />
        <FlatList
          data={menu}
          style={{ flex: 0.3 }}
          removeClippedSubviews={Platform.OS === 'android'}
          renderItem={({ item }) =>
            (item.type === 'A' || global.user.usertype === item.type ? (
              <ListItem
                title={item.title}
                titleStyle={{ fontSize: 16, color: '#454F63', fontWeight: '600' }}
                leftIcon={{
                  name: item.icon,
                  color: '#665EFF',
                  style: { marginRight: 15, fontSize: 20 },
                  type: 'font-awesome'
                }}
                containerStyle={{
                  paddingVertical: 15
                }}
                onPress={() => {
                  if (item.nav === 'Share') {
                    this.onShare();
                  } else if (item.nav === 'SignOut') {
                    Alert.alert('Información', '¿Estás seguro que querés cerrar sesión?', [
                      {
                        text: 'Cancelar',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      {
                        text: 'Aceptar',
                        onPress: () => actions.signOutRequest()
                      }
                    ]);
                  } else if (item.nav === 'UserProfile') {
                    navigation.push('Reputation', {
                      user: {
                        uid: global.user.uid,
                        fullname: global.user.fullname,
                        username: global.user.username
                      }
                    });
                  } else {
                    navigation.navigate(item.nav);
                  }
                }}
              />
            ) : (
              undefined
            ))
          }
          keyExtractor={(item) => item.nav}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
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
)(Profile);
