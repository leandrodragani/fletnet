import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView } from 'expo';
import { Linking, Alert, Dimensions } from 'react-native';
import { Container } from '../../components/container';
import { StatusBadge } from '../../components/status-badge';
import { LanguageHelper } from '../../utils/helpers/language';
import { getRegionForCoordinates } from '../../utils/helpers/mapview';
import { Actions } from './actions';
import {
  ORDER_TYPE_DISTRIBUTION,
  ORDER_TRACKING_STATUS_ON_TRIP,
  ORDER_TRACKING_STATUS_PENDING,
  ORDER_TRACKING_STATUS_PICKUP,
  ORDER_TRACKING_STATUS_CLOSE
} from '../../utils/constants/orders';
import { CARRIER_USER_TYPE, CLIENT_USER_TYPE } from '../../utils/constants/users';
import { Directions } from './components/directions';
import { CarrierLocation } from './components/carrier-location';
import { InfoCard } from './components/info-card';
import { DetailModal } from './components/detail-modal';
import { Button } from '../../components/button';
import { ButtonContainer } from './styles';
import { ActionsModal } from '../../components/actions-modal';
import { GOOGLE_MAPS_BASE_URL, WAZE_BASE_URL } from '../../utils/constants/urls';

class OrderTracking extends React.Component {
  static navigationOptions = {
    title: 'Seguimiento',
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

  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,
      mapOptionsVisible: false
    };
  }

  componentDidMount() {
    const { actions, navigation, global } = this.props;
    actions.orderTrackingRequest({
      orderId: navigation.state.params.orderId,
      usertype: global.user.type
    });
  }

  getUrlOnTripStatusGoogleMaps = () => {
    const { reducer } = this.props;
    let url = `${GOOGLE_MAPS_BASE_URL}?api=1&origin=${reducer.carrierLocation.latitude},${
      reducer.carrierLocation.longitude
    }&destination=${reducer.order.destination.coordinates.latitude},${
      reducer.order.destination.coordinates.longitude
    }&waypoints=`;

    let waypoints = '';
    if (reducer.order.type === ORDER_TYPE_DISTRIBUTION) {
      reducer.order.waypoints.forEach((element) => {
        waypoints += `${element.coordinates.latitude},${element.coordinates.longitude}|`;
      });

      waypoints = waypoints.slice(0, -1);
      url += `${waypoints}&travelmode=drive`;
    } else {
      url += '&travelmode=drive';
    }
    return url;
  };

  getUrlOnTripStatusWaze = () => {
    const { reducer } = this.props;
    let url = `${WAZE_BASE_URL}?q=${reducer.order.destination.coordinates.latitude},${
      reducer.order.destination.coordinates.longitude
    }&navigate=yes`;

    let waypoints = '';
    if (reducer.order.type === ORDER_TYPE_DISTRIBUTION) {
    }
    return url;
  };

  getUrlPickUpStatusGoogleMaps = () => {
    const { reducer } = this.props;
    const url = `${GOOGLE_MAPS_BASE_URL}?api=1&origin=${reducer.carrierLocation.latitude},${
      reducer.carrierLocation.longitude
    }&destination=${reducer.order.origin.coordinates.latitude},${
      reducer.order.origin.coordinates.longitude
    }&travelmode=drive`;
    return url;
  };

  getUrlPickUpStatusWaze = () => {
    const { reducer } = this.props;
    const url = `${WAZE_BASE_URL}?q=${reducer.order.origin.coordinates.latitude},${
      reducer.order.origin.coordinates.longitude
    }&navigate=yes`;
    return url;
  };

  renderMapOptions = () => {
    const { mapOptionsVisible } = this.state;
    const { reducer } = this.props;

    return (
      <ActionsModal
        type="dark"
        visible={mapOptionsVisible}
        onRequestClose={() => this.setState({ mapOptionsVisible: false })}
        title="Seleccioná una opción"
      >
        <Button
          width={Dimensions.get('window').width - 40}
          color="#665EFF"
          radius
          onPress={() => {
            let url;
            if (reducer.trackingStatus === ORDER_TRACKING_STATUS_PICKUP) {
              url = this.getUrlPickUpStatusGoogleMaps();
            } else if (reducer.trackingStatus === ORDER_TRACKING_STATUS_ON_TRIP) {
              url = this.getUrlOnTripStatusGoogleMaps();
            }
            return Linking.openURL(url);
          }}
          title="GOOGLE MAPS"
        />
        <Button
          width={Dimensions.get('window').width - 40}
          color="#959DAD"
          radius
          onPress={() => {
            let url;
            if (reducer.trackingStatus === ORDER_TRACKING_STATUS_PICKUP) {
              url = this.getUrlPickUpStatusWaze();
            } else if (reducer.trackingStatus === ORDER_TRACKING_STATUS_ON_TRIP) {
              url = this.getUrlOnTripStatusWaze();
            }
            return Linking.openURL(url);
          }}
          title="WAZE"
        />
      </ActionsModal>
    );
  };

  detailModal = () => {
    const { detailVisible } = this.state;
    const { reducer, global, navigation } = this.props;

    return (
      <DetailModal
        visible={detailVisible}
        onRequestClose={() => this.setState({ detailVisible: false })}
        profile={{
          title:
            global.user.type === CLIENT_USER_TYPE
              ? reducer.carrier.fullname
              : reducer.client.fullname
        }}
        trackingStatus={reducer.trackingStatus}
        onPressViewProfile={() => {
          this.setState({ detailVisible: false });
          navigation.push('Reputation', {
            user: global.user.type === CLIENT_USER_TYPE ? reducer.carrier : reducer.client
          });
        }}
        onPressCall={() => Linking.openURL(`tel:${reducer.carrier.vehicle.number_phone}`)}
        onPressCancelOrder={() => {
          this.setState({ detailVisible: false });
          navigation.navigate('OrderCancel', {
            orderID: reducer.order.id,
            trackingStatus: reducer.trackingStatus
          });
        }}
        onPressChat={() => {
          this.setState({ detailVisible: false });
          navigation.push('Chat', {
            title:
              global.user.type === CLIENT_USER_TYPE
                ? reducer.carrier.username
                : reducer.client.username,
            transmitter: global.user.uid,
            receiver:
              global.user.type === CLIENT_USER_TYPE ? reducer.carrier.uid : reducer.client.uid
          });
        }}
        usertype={global.user.type}
        duration={reducer.order.duration}
        distance={reducer.order.distance}
        value={reducer.order.value}
        sinceTime={reducer.order.since_time}
        untilTime={reducer.order.until_time}
        orderDate={reducer.order.order_date}
        assistant={reducer.order.assistant}
        withReturn={reducer.order.withReturn}
        uriIMG={
          global.user.type === CLIENT_USER_TYPE ? reducer.carrier.uri_img : reducer.client.uri_img
        }
        origin={reducer.order.origin}
        destination={
          reducer.order.type === ORDER_TYPE_DISTRIBUTION
            ? reducer.order.waypoints
            : [reducer.order.destination]
        }
      />
    );
  };

  render() {
    const { reducer, global, actions, navigation } = this.props;
    return (
      <Container>
        <MapView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          loadingEnabled
          onMapReady={() => {
            if (reducer.carrierLocation !== undefined && reducer.order.origin !== undefined) {
              this.mapView.fitToCoordinates(
                [
                  reducer.carrierLocation,
                  {
                    latitude: -34.603722,
                    longitude: -58.381592,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2
                  }
                ],
                {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 50,
                    bottom: 350
                  }
                }
              );
            }
          }}
          showsUserLocation
          region={
            reducer.carrierLocation !== undefined && reducer.order.origin !== undefined
              ? getRegionForCoordinates([reducer.carrierLocation, reducer.order.origin.coordinates])
              : {
                  latitude: -34.603722,
                  longitude: -58.381592,
                  latitudeDelta: 0.2,
                  longitudeDelta: 0.2
                }
          }
          ref={(el) => (this.mapView = el)}
          provider="google"
        >
          {reducer.carrierLocation !== undefined && (
            <CarrierLocation
              location={reducer.carrierLocation}
              distance={reducer.carrierDistanceMatrix.toFixed(2)}
            />
          )}
          {!reducer.isFetchingOrder && (
            <Directions
              origin={reducer.order.origin}
              destinations={
                reducer.order.type === ORDER_TYPE_DISTRIBUTION
                  ? reducer.order.waypoints
                  : [reducer.order.destination]
              }
              polyline={reducer.order.polyline}
            />
          )}
        </MapView>
        {global.user.type === CARRIER_USER_TYPE &&
        (reducer.trackingStatus === ORDER_TRACKING_STATUS_ON_TRIP ||
          reducer.trackingStatus === ORDER_TRACKING_STATUS_PICKUP) ? (
          <ButtonContainer>
            <Button
              width="250px"
              radius
              color="#665EFF"
              title="ABRIR MAPA"
              onPress={() => {
                this.setState({ mapOptionsVisible: true });
              }}
            />
          </ButtonContainer>
        ) : null}
        <InfoCard
          title={
            global.user.type === CLIENT_USER_TYPE
              ? reducer.carrier.fullname
              : reducer.client.fullname
          }
          subtitle={
            global.user.type === CLIENT_USER_TYPE
              ? `${reducer.carrier.vehicle.brand} ${reducer.carrier.vehicle.model} • ${
                  reducer.carrier.vehicle.license_plate
                }`
              : `A transportar: ${reducer.order.title}`
          }
          loading={
            global.user.type === CLIENT_USER_TYPE
              ? reducer.isFetchingCarrier
              : reducer.isFetchingClient
          }
          onPress={() => this.setState({ detailVisible: true })}
          image={{
            size: 'medium',
            source: {
              uri:
                global.user.type === CLIENT_USER_TYPE
                  ? reducer.carrier.vehicle.uri_vehicle
                  : reducer.client.uri_img
            }
          }}
          bottomElement={(() => {
            if (global.user.type === CARRIER_USER_TYPE) {
              let button = {};
              switch (reducer.trackingStatus) {
                case ORDER_TRACKING_STATUS_PENDING:
                  button = {
                    title: 'Voy para alla',
                    onPress: () => {
                      Alert.alert(
                        'Información',
                        'Al aceptar, confirmas que estás yendo a buscar el pedido.',
                        [
                          {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                          },
                          {
                            text: 'Aceptar',
                            onPress: () => {
                              actions.setOrderTrackingStatus({
                                order: reducer.order,
                                status: ORDER_TRACKING_STATUS_PICKUP,
                                carrier: reducer.carrier,
                                client_uid: reducer.client.uid
                              });
                            }
                          }
                        ]
                      );
                    },
                    color: '#FF9057'
                  };
                  break;
                case ORDER_TRACKING_STATUS_PICKUP:
                  button = {
                    title: 'Voy hacia el destino',
                    onPress: () => {
                      Alert.alert(
                        'Información',
                        'Al aceptar, confirmas que estás yendo a entregar el pedido.',
                        [
                          {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                          },
                          {
                            text: 'Aceptar',
                            onPress: () => {
                              actions.setOrderTrackingStatus({
                                order: reducer.order,
                                status: ORDER_TRACKING_STATUS_ON_TRIP,
                                carrier: reducer.carrier,
                                client_uid: reducer.client.uid
                              });
                            }
                          }
                        ]
                      );
                    },
                    color: '#FF9057'
                  };
                  break;
                case ORDER_TRACKING_STATUS_ON_TRIP:
                  button = {
                    title: 'Firmar entrega',
                    onPress: () => {
                      Alert.alert(
                        'Información',
                        'Al aceptar, confirmas que el pedido fue entregado.',
                        [
                          {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                          },
                          {
                            text: 'Aceptar',
                            onPress: () => {
                              navigation.navigate('Signature', {
                                orderID: reducer.order.id,
                                title: reducer.order.title,
                                client_uid: reducer.client.uid,
                                fullname: global.user.fullname
                              });
                            }
                          }
                        ]
                      );
                    },
                    color: '#FF4F9A'
                  };
                  break;
                case ORDER_TRACKING_STATUS_CLOSE:
                  button = {
                    title: 'Calificar',
                    onPress: () => {
                      navigation.push('Rate', {
                        order: {
                          title: reducer.order.title,
                          since_time: reducer.order.since_time,
                          order_date: reducer.order.order_date,
                          id: reducer.order.id
                        },
                        user: { uid: reducer.client.uid }
                      });
                    },
                    color: '#C840E9'
                  };
                  break;
                default:
                  button = {};
              }

              return (
                <Button
                  width="250px"
                  color={button.color}
                  radius
                  onPress={button.onPress}
                  title={button.title}
                />
              );
            }
            return <StatusBadge status={reducer.trackingStatus} />;
          })()}
        />
        {this.renderMapOptions()}
        {!reducer.isFetchingOrder && this.detailModal()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.orderTrackingReducer,
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
)(OrderTracking);
