import React from 'react';
import { Platform, FlatList, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ButtonGroup, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from '../../components/container';
import { EmptyListWarning } from '../../components/empty-list-warning';
import { CarrierOrderItem } from './components/carrier-order-item';
import { ClientOrderItem } from './components/client-order-item';
import { Actions } from './actions';
import { AddOrderButtonContainer, HeaderTitle } from './styles';
import { LanguageHelper } from '../../utils/helpers/language';
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_CLOSED,
  ORDER_STATUS_CANCELLED
} from '../../utils/constants/orders';
import { CLIENT_USER_TYPE } from '../../utils/constants/users';
import { Button } from '../../components/button';

const AnimatedHeaderTitle = Animatable.createAnimatableComponent(HeaderTitle);
class Orders extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions, global } = this.props;
    actions.ordersRequest({ uid: global.user.uid, index: 0 });
  }

  updateIndex = (selectedIndex) => {
    const { actions } = this.props;
    const index = selectedIndex === 0 ? 0 : 1;
    actions.filterOrders(index);
  };

  render() {
    const { reducer, global, actions, navigation } = this.props;
    return (
      <Container>
        <AnimatedHeaderTitle animation="fadeInLeft" duration={500} easing="ease-out">Mis pedidos</AnimatedHeaderTitle>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={reducer.selectedIndex}
          buttons={['EN CURSO', 'FINALIZADOS']}
          containerStyle={{
            height: 38,
            borderColor: '#F4F4F6',
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 10
          }}
          innerBorderStyle={{ color: '#F4F4F6' }}
          textStyle={{ fontSize: 13, color: '#959DAD' }}
          selectedTextStyle={{ fontSize: 13, color: '#454F63' }}
          selectedButtonStyle={{
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#665EFF',
            borderBottomWidth: 4
          }}
        />
        <FlatList
          data={reducer.ordersFiltered}
          removeClippedSubviews={Platform.OS === 'android'}
          ListEmptyComponent={
            reducer.isFetching ? (
              undefined
            ) : (
              <EmptyListWarning
                image={require('../../assets/images/empty_orders.png')}
                description="No se encontraron pedidos realizados o en curso."
              />
            )
          }
          onRefresh={() => {
            actions.ordersRequest({ uid: global.user.uid, index: reducer.selectedIndex });
          }}
          refreshing={reducer.isFetching}
          renderItem={({ item }) =>
            global.user.type === CLIENT_USER_TYPE ? (
              <ClientOrderItem
                status={item.status}
                title={item.title}
                id={item.id}
                onPress={() => {
                  item.status === ORDER_STATUS_PENDING
                    ? navigation.push('OrderDetail', { orderID: item.id })
                    : item.status == ORDER_STATUS_DELIVERED
                    ? navigation.push('Rate', {
                        order: {
                          title: item.title,
                          since_time: item.since_time,
                          order_date: item.order_date,
                          id: item.id
                        },
                        user: { uid: item.carrier_uid }
                      })
                    : navigation.push('OrderTracking', { orderId: item.id });
                }}
                disabled={
                  item.status == ORDER_STATUS_CLOSED || item.status == ORDER_STATUS_CANCELLED
                }
                createDate={item.create_date}
              />
            ) : (
              <CarrierOrderItem
                status={item.status}
                title={item.title}
                id={item.id}
                onPress={() =>
                  item.status === ORDER_STATUS_DELIVERED
                    ? navigation.push('Rate', {
                        order: {
                          title: item.title,
                          since_time: item.since_time,
                          order_date: item.order_date,
                          id: item.id
                        },
                        user: { uid: item.uid }
                      })
                    : navigation.push('OrderTracking', { orderId: item.id })
                }
                disabled={
                  item.status === ORDER_STATUS_CLOSED || item.status === ORDER_STATUS_CANCELLED
                }
                createDate={item.create_date}
              />
            )
          }
          keyExtractor={(item) => item.id}
        />
        {global.user.type === CLIENT_USER_TYPE && (
          <AddOrderButtonContainer>
            <View>
              <Divider style={{ backgroundColor: 'gray', marginBottom: 10, opacity: 0.2 }} />
              <Button
                width={Dimensions.get('window').width - 40}
                radius
                title="REALIZAR PEDIDO"
                color="#665EFF"
                onPress={() => navigation.navigate('Title')}
              />
            </View>
          </AddOrderButtonContainer>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.ordersReducer,
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
)(Orders);
