import React from 'react';
import { Platform, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Divider } from 'react-native-elements';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from '../../components/container';
import { EmptyListWarning } from '../../components/empty-list-warning';
import { NotificationItem } from './components/notification-item';
import { Actions } from './actions';
import { MessagesButton, HeaderTitle } from './styles';
import { LanguageHelper } from '../../utils/helpers/language';
import { getDatePersonalized } from '../../utils/date-utils';

const AnimatedHeaderTitle = Animatable.createAnimatableComponent(HeaderTitle);
class Notifications extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: ' ',
      headerRight: (
        <MessagesButton onPress={() => navigation.navigate('Messages')}>
          <Icon.Ionicons name="ios-chatbubbles" color="#BBBCCD" size={25} />
        </MessagesButton>
      ),
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
    };
  };

  componentDidMount() {
    const { actions, global } = this.props;
    actions.notificationsRequest({ uid: global.user.uid });
  }

  render() {
    const { reducer, actions, global, handleNotification } = this.props;

    return (
      <Container>
        <AnimatedHeaderTitle animation="fadeInLeft" duration={500} easing="ease-out">Notificaciones</AnimatedHeaderTitle>
        <FlatList
          data={reducer.notifications}
          removeClippedSubviews={Platform.OS === 'android'}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: 'gray', marginHorizontal: 15, opacity: 0.2 }} />
          )}
          renderItem={({ item }) => (
            <NotificationItem
              onPress={() => {
                actions.toggleReadNotification({
                  uid: global.user.uid,
                  notificationKey: item.payload.key
                });
                handleNotification(item);
              }}
              title={item.payload.params.title}
              subtitle={item.payload.params.description}
              date={getDatePersonalized(new Date(item.payload.params.timestamp))}
              read={item.payload.params.read}
            />
          )}
          ListEmptyComponent={
            reducer.isFetchingNotifications ? (
              undefined
            ) : (
              <EmptyListWarning description="No hay nuevas notificaciones." />
            )
          }
          keyExtractor={(item) => item.payload.key}
          onRefresh={() => actions.notificationsRequest({ uid: global.user.uid })}
          refreshing={reducer.isFetchingNotifications}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.notificationsReducer,
    global: state.globalReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch),
    handleNotification: (item) => {
      dispatch(item);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
