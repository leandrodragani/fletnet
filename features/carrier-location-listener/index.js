import React from 'react';
import { Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCarrierLocation } from '../home/actions';

class CarrierLocationListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listener: undefined
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const provider = await Location.getProviderStatusAsync();
    if (status === 'granted') {
      if (provider.locationServicesEnabled) {
        const listener = await this.watchCarrierPosition();
        this.setState({ listener });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const { listener } = this.state;
    const { global } = this.props;

    if (prevProps.global.carrierLocationConfig !== global.carrierLocationConfig) {
      if (listener !== undefined) {
        listener.remove();
        const newListener = await this.watchCarrierPosition();
        this.setState({ listener: newListener });
      }
    }
  }

  componentWillUnmount() {
    const { listener } = this.state;
    if (listener !== undefined) {
      listener.remove();
    }
  }

  watchCarrierPosition = async () => {
    const { actions, global } = this.props;
    return await Location.watchPositionAsync(
      {
        enableHighAccuracy: false,
        timeout: 30000,
        timeInterval: global.carrierLocationConfig.timeInterval,
        distanceInterval: global.carrierLocationConfig.distanceInterval
      },
      (carrierLocation) => {
        actions.updateCarrierLocation({
          uid: global.user.uid,
          coords: carrierLocation.coords
        });
      }
    );
  };

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    global: state.globalReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateCarrierLocation }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarrierLocationListener);
