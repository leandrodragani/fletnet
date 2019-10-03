import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Container } from '../../../../components/container';
import { Button } from '../../../../components/button';
import { Actions } from '../../actions';
import { Selectors } from '../../selectors';
import { Widget } from '../../../../components/widget';
import { HeaderTitle } from "../../styles";
import { 
  Card,
  Caption,
  OrderPriceText,
  OrderPriceSubtitle,
  ButtonContainer,
  WidgetContainer,
  OrderPriceContainer 
} from "./styles";
import { MinimapLocations } from '../../../../components/minimap-locations';

class Summary extends React.Component {
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

  componentDidMount() {
    const { navigation, actions } = this.props;
    actions.calculateOrderSummaryRequest(navigation.state.params.request);
  }

  navigateToPayment = () => {
    const {
      origin,
      destinations,
      sinceOrderTime,
      untilOrderTime,
      withReturn,
      title,
      vehicleType,
      assistant,
      orderDate
    } = this.props.navigation.state.params.request;
    const {
      navigation,
      value,
      polyline,
      duration,
      distance,
      orderType,
      overviewPolyline
    } = this.props;

    navigation.navigate('Payment', {
      title,
      origin,
      destinations,
      orderAssistant: assistant,
      sinceTime: sinceOrderTime,
      untilTime: untilOrderTime,
      orderDate,
      withReturn,
      vehicleType,
      orderSummary: {
        value,
        polyline,
        duration,
        distance,
        orderType,
        overview_polyline: overviewPolyline
      }
    });
  };

  renderDetail = () => {
    const { origin, destinations } = this.props.navigation.state.params.request;
    const { value, polyline, duration, distance } = this.props;

    return (
      <Container>
        <HeaderTitle>Resumen</HeaderTitle>
        <Fragment>
          <Caption>PRECIO A PAGAR</Caption>
          <Card>
            <OrderPriceContainer>
              <OrderPriceText>${value}</OrderPriceText>
              <OrderPriceSubtitle>
                Los peajes corren por su cuenta, siempre y cuando el transportista
                presente los comprobantes correspondientes.
              </OrderPriceSubtitle>
            </OrderPriceContainer>
          </Card>
        </Fragment>
        <Fragment>
          <Caption>TU VIAJE</Caption>
          <Card>
            <MinimapLocations
              origin={origin}
              destinations={destinations}
              polyline={polyline}
            />
          </Card>
        </Fragment>
        <WidgetContainer>
          <Card>
            <Widget
              value={duration}
              label="Duración"
              icon={
                <Icon.Ionicons name="ios-timer" color="#665EFF" size={25} />
              }
            />
          </Card>
          <Card>
            <Widget
              value={distance}
              label="Recorrido"
              icon={<Icon.Ionicons name="ios-map" color="#665EFF" size={25} />}
            />
          </Card>
        </WidgetContainer>
        <ButtonContainer>
          <View>
            <Divider style={{ backgroundColor: 'gray', opacity: 0.2, marginVertical: 10 }} />
            <Button
              width={Dimensions.get('window').width - 30}
              color="#665EFF"
              radius
              onPress={this.navigateToPayment}
              title="REALIZAR PEDIDO"
            />
          </View>
        </ButtonContainer>
      </Container>
    );
  };

  render() {
    return (
      <Container>
        {this.props.summarySuccess ? (
          this.renderDetail()
        ) : (
          <ActivityIndicator color="black" />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    distance: Selectors.distanceSelector(state),
    duration: Selectors.durationSelector(state),
    value: Selectors.orderValueSelector(state),
    polyline: Selectors.polylineSelector(state),
    overviewPolyline: Selectors.overviewPolylineSelector(state),
    orderType: Selectors.typeSelector(state),
    summarySuccess: Selectors.summarySuccessSelector(state),
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
)(Summary);
