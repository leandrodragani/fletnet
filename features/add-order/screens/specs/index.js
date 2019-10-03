import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { AddOrderSpecificationsItems } from '../../components/specifications-items';
import { connect } from 'react-redux';
import { HeaderTitle } from '../../styles';
import { Card, ButtonContainer } from './styles';
import { Container } from '../../../../components/container';
import { Button } from '../../../../components/button';

class Specs extends React.Component {
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
      withReturn: false,
      assistant: false,
      orderDate: '',
      sinceOrderTime: '',
      untilOrderTime: '',
    };
  }

  goToSummary = () => {
    const { withReturn, assistant, orderDate, sinceOrderTime, untilOrderTime } = this.state;
    const { navigation, reducer } = this.props;
    const request = {
      ...reducer.trip,
      title: reducer.title,
      vehicleType: reducer.vehicleType,
      assistant,
      withReturn,
      sinceOrderTime,
      untilOrderTime,
      orderDate
    };

    navigation.navigate('Summary', { request });
  };

  render() {
    const { withReturn, assistant, orderDate, sinceOrderTime, untilOrderTime } = this.state;
    return (
      <Container>
        <HeaderTitle>Especificaciones</HeaderTitle>
        <ScrollView>
          <Card>
            <AddOrderSpecificationsItems
              withReturn={withReturn}
              onWithReturnPress={() => this.setState({ withReturn: !withReturn })}
              assistant={assistant}
              onAssistantPress={() => this.setState({ assistant: !assistant })}
              orderDate={orderDate}
              sinceOrderTime={sinceOrderTime}
              untilOrderTime={untilOrderTime}
              onOrderDateChange={date => this.setState({ orderDate: date })}
              onSinceOrderTimeChange={date => this.setState({ sinceOrderTime: date })}
              onUntilOrderTimeChange={date => this.setState({ untilOrderTime: date })}
            />
          </Card>
        </ScrollView>
        <ButtonContainer>
          <View>
            <Divider
              style={{
                backgroundColor: 'gray',
                opacity: 0.2,
                marginBottom: 10
              }}
            />
            <Button
              width={Dimensions.get('window').width - 40}
              title="CALCULAR TARIFA"
              color="#665EFF"
              onPress={this.goToSummary}
            />
          </View>
        </ButtonContainer>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.addOrder,
    global: state.globalReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators({ ...Actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Specs);
