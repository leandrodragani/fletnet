import React from 'react';
import { Platform, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from '../../components/container';
import { EmptyListWarning } from '../../components/empty-list-warning';
import { ConversationItem } from './components/conversation-item';
import { Actions } from './actions';
import { LanguageHelper } from '../../utils/helpers/language';
import { HeaderTitle } from './styles';

class Messages extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { global, actions } = this.props;
    actions.messagesRequest({ uid: global.user.uid });
  }

  render() {
    const { reducer, actions, global, navigation } = this.props;

    return (
      <Container>
        <HeaderTitle>Mensajes</HeaderTitle>
        <FlatList
          data={reducer.messages}
          removeClippedSubviews={Platform.OS === 'android'}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: 'gray', marginHorizontal: 10, opacity: 0.2 }} />
          )}
          renderItem={({ item }) => (
            <ConversationItem
              onPress={() =>
                navigation.push('Chat', {
                  transmitter: global.user.uid,
                  receiver: item.uid,
                  title: item.username
                })
              }
              username={item.username}
              lastMessage={item.lastMessage}
              uid={item.uid}
              uriIMG={item.uri_img}
            />
          )}
          ListEmptyComponent={
            reducer.isFetching ? (
              undefined
            ) : (
              <EmptyListWarning
                image={require('../../assets/images/empty_messages.png')}
                description="No hay nuevos mensajes."
              />
            )
          }
          keyExtractor={(item) => item.key}
          onRefresh={() => actions.messagesRequest({ uid: global.user.uid })}
          refreshing={reducer.isFetching}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.messagesReducer,
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
)(Messages);
