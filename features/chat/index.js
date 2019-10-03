import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from './actions';
import { LanguageHelper } from '../../utils/helpers/language';
import { SendContainer, SendText, Container } from './styles';


class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerTitleStyle: { color: '#454F63' },
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 6,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
      }
    };
  };

  componentDidMount() {
    const { actions, navigation } = this.props;

    actions.startChatChannel({
      transmitter: navigation.state.params.transmitter,
      receiver: navigation.state.params.receiver
    });
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.closeChatChannel();
  }

  onSend = (text) => {
    const { global, navigation, actions } = this.props;
    if (text[0].text.trim()) {
      actions.sendMessageRequest({
        messageSent: text[0].text.trim(),
        transmitter: navigation.state.params.transmitter,
        receiver: navigation.state.params.receiver,
        usernameTransmitter: global.user.username
      });
    }
  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0'
          },
          right: {
            backgroundColor: '#665EFF'
          }
        }}
      />
    );
  };

  render() {
    const { reducer, actions, global } = this.props;

    return (
      <Container>
        <GiftedChat
          messages={reducer.messages}
          onSend={this.onSend}
          locale="es"
          placeholder="Escribir mensaje..."
          // loadEarlier={this.state.loadEarlier}
          // onLoadEarlier={this.onLoadEarlier}
          // isLoadingEarlier={this.state.isLoadingEarlier}
          renderAvatar={null}
          alwaysShowSend
          renderSend={(props) => (
            <Send {...props}>
              <SendContainer>
                {reducer.isSending ? <ActivityIndicator /> : <SendText>Enviar</SendText>}
              </SendContainer>
            </Send>
          )}
          user={{
            _id: global.user.uid
          }}
          maxInputLength={200}
          renderBubble={this.renderBubble}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.chatReducer,
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
)(Chat);
