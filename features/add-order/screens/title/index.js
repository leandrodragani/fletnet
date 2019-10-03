import React from 'react';
import { View, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';
import { setTitle } from '../../actions';
import { HeaderTitle, ButtonContainer2 } from '../../styles';
import { TextInput, Caption } from './styles';
import { Container } from '../../../../components/container';
import { Button } from '../../../../components/button';
import { DismissKeyboard } from '../../../../components/dismiss-keyboard';

class Title extends React.Component {
  static navigationOptions = () => {
    return {
      title: '',
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        borderBottomWidth: 0
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  onChangeTitle = (text) => {
    this.setState({ title: text });
  };

  goToVehicle = () => {
    const { title } = this.state;
    const { navigation, actions } = this.props;
    actions.setTitle(title);
    navigation.navigate('Vehicle');
  };

  render() {
    const { title } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={Header.HEIGHT}
      >
        <Container>
          <DismissKeyboard>
            <View style={{ flex: 1 }}>
              <HeaderTitle>¿Qué vas a transportar?</HeaderTitle>
              <TextInput
                placeholder="Ej. Set de muebles, cajas, insumos, etc..."
                onChangeText={this.onChangeTitle}
                value={title}
                returnKeyType="done"
                accessibilityLabel="textInputTitle"
                maxLength={80}
                placeholderTextColor="#959DAD"
                autoFocus
              />
              <Caption>{`${title.length} de 80 caracteres`}</Caption>
              <ButtonContainer2>
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
                    onPress={this.goToVehicle}
                    disabled={title.length === 0}
                  />
                </View>
              </ButtonContainer2>
            </View>
          </DismissKeyboard>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setTitle }, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Title);
