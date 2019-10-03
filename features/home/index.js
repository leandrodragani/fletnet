import React, { Fragment } from 'react';
import { FlatList, Platform, Linking, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Permissions, Location, IntentLauncherAndroid } from 'expo';
import { Container } from '../../components/container';
import { Button } from '../../components/button';
import { CarrierCard } from './components/carrier-card';
import { LocationServicesError } from '../../components/location-services-error';
import { EmptyListWarning } from '../../components/empty-list-warning';
import { Actions } from './actions';
import { DropDownHelper } from '../../utils/helpers/dropdown';
import { LoadMoreButtonContainer, HeaderTitle } from './styles';
import { LanguageHelper } from '../../utils/helpers/language';
import { getVehicleTypeText } from '../../utils/vehicle-utils';
import { getOrderTypeText } from '../../utils/order-utils';
import CarrierLocationListener from '../carrier-location-listener';
import { setCarrierLocationConfig } from '../../redux/global/actions';

const AnimatedHeaderTitle = Animatable.createAnimatableComponent(HeaderTitle);
class Home extends React.Component {
  static navigationOptions = {
    title: ' ',
    headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      locationError: false,
      locationLoadingAgain: false
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const { actions } = this.props;
    actions.setFetchingLocation();
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const provider = await Location.getProviderStatusAsync();
    if (provider.locationServicesEnabled) {
      if (status !== 'granted') {
        DropDownHelper.alert(
          'warn',
          'Permisos',
          'No hay permisos para acceder al mapa. Activa la ubicación desde la configuración de tu teléfono.'
        );
      } else {
        try {
          this.setState({ locationError: false });
          let location = {};

          await Promise.race([
            Location.getCurrentPositionAsync({}),
            new Promise((resolve, reject) => {
              setTimeout(reject, 9000);
            })
          ])
            .then((result) => {
              location = result;
            })
            .catch(async (error) => {
              console.log(error);
              location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                maximumAge: 360000
              });
            });
          actions.homeOrdersRequest({ location });
        } catch (e) {
          console.log(e);
          this.setState({ locationError: true });
          DropDownHelper.alert(
            'warn',
            'Permisos',
            'Los servicios de ubicacion estan desactivados. Activa la ubicación desde la configuración de tu teléfono.'
          );
        }
      }
    } else {
      this.setState({ locationError: true });
      DropDownHelper.alert('warn', 'Permisos', 'Activa la ubicación para ver los datos');
    }
    this.setState({ locationLoadingAgain: false });
  };

  render() {
    const { reducer, actions, navigation } = this.props;
    const { locationError, locationLoadingAgain } = this.state;
    return (
      <Fragment>
        <CarrierLocationListener />
        <Container>
          {locationError ? (
            <LocationServicesError
              description="Los servicios de ubicación estan desactivados."
              onConfigurationPress={() => {
                Platform.OS == 'ios'
                  ? Linking.openURL('app-settings:')
                  : IntentLauncherAndroid.startActivityAsync(
                      IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                    );
              }}
              onLoadAgainPress={() => {
                this.setState({ locationLoadingAgain: true });
                this.getLocationAsync();
              }}
              loading={locationLoadingAgain}
            />
          ) : (
            <Fragment>
              <AnimatedHeaderTitle animation="fadeInLeft" duration={500} easing="ease-out">Pedidos cercanos</AnimatedHeaderTitle>
              <FlatList
                contentContainerStyle={{ marginTop: 15 }}
                data={reducer.orders}
                removeClippedSubviews={Platform.OS === 'android'}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CarrierCard
                    id={item.id}
                    title={item.title}
                    orderType={getOrderTypeText(item.type)}
                    orderValue={item.value}
                    origin={item.origin}
                    distance={item.distance}
                    vehicleType={getVehicleTypeText(item.vehicleType)}
                    onPress={() => navigation.push('OrderDetail', { orderID: item.id })}
                  />
                )}
                keyExtractor={(item) => item.id}
                onRefresh={() => this.getLocationAsync()}
                refreshing={reducer.isFetching}
                ListEmptyComponent={
                  reducer.isFetching ? (
                    undefined
                  ) : (
                    <EmptyListWarning
                      image={require('../../assets/images/empty_orders.png')}
                      description="No se encontraron resultados cercanos a tu ubicación"
                    />
                  )
                }
              />
              {!reducer.isFetching && (
                <LoadMoreButtonContainer>
                  <View>
                    <Divider
                      style={{ backgroundColor: 'gray', marginVertical: 10, opacity: 0.2 }}
                    />
                    <Button
                      width={Dimensions.get('window').width - 40}
                      radius
                      color="#665EFF"
                      title="MOSTRAR MÁS"
                      loading={reducer.isFetchingMore}
                      onPress={() => reducer.location !== null && actions.requestMoreOrders()}
                      // onPress={() => actions.setCarrierLocationConfig({ timeInterval: 3000 })}
                    />
                  </View>
                </LoadMoreButtonContainer>
              )}
            </Fragment>
          )}
        </Container>
        {/* <RadiusCard radius={reducer.radius} /> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.homeReducer,
    global: state.globalReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions, setCarrierLocationConfig }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
