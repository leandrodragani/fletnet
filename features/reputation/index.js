import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, Platform } from 'react-native';
import { Rating, ListItem, Divider } from 'react-native-elements';
import { Actions } from './actions';
import { Selectors } from './selectors';
import {
  FullnameTitleText,
  UsernameSubTitleText,
  WidgetContainer,
  FullnameTitleContainer
} from './styles';
import { Container } from '../../components/container';
import { EmptyListWarning } from '../../components/empty-list-warning';
import { Widget } from './components/widget';

class Reputation extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: { backgroundColor: '#2A2E43', elevation: 0, borderBottomWidth: 0 }
  };

  componentDidMount() {
    const { actions, navigation } = this.props;
    actions.averageCalificationRequest({ uid: navigation.state.params.user.uid });
  }

  render() {
    const {
      isFetchingAverage,
      isFetchingUsersCalifications,
      califications,
      average,
      navigation
    } = this.props;
    return (
      <Container>
        <FullnameTitleContainer>
          <UsernameSubTitleText>{navigation.state.params.user.username}</UsernameSubTitleText>
          <FullnameTitleText>{navigation.state.params.user.fullname}</FullnameTitleText>
        </FullnameTitleContainer>
        <WidgetContainer>
          <Widget
            icon="ios-star"
            label="Calificación"
            value={average}
            loading={isFetchingAverage}
          />
          <Widget
            icon="ios-archive"
            label="Pedidos realizados"
            value={califications.length}
            loading={isFetchingUsersCalifications}
          />
        </WidgetContainer>
        <FlatList
          data={califications}
          contentContainerStyle={{ backgroundColor: 'white' }}
          removeClippedSubviews={Platform.OS === 'android'}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 10 }} />
          )}
          refreshing={isFetchingUsersCalifications}
          style={{ paddingBottom: 5 }}
          renderItem={({ item }) => (
            <ListItem
              key={item.create_date}
              contentContainerStyle={{
                marginTop: 5
              }}
              title={item.username}
              subtitle={item.message}
              rightElement={<Rating imageSize={16} readonly startingValue={item.rating} />}
              titleStyle={{
                fontWeight: '600',
                fontSize: 16,
                color: '#454F63',
                marginBottom: 8
              }}
              subtitleStyle={{
                fontSize: 14,
                color: '#78849E'
              }}
              containerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                marginHorizontal: 4,
                backgroundColor: 'transparent'
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          onRefresh={() => console.log('asd')}
          ListEmptyComponent={
            isFetchingUsersCalifications ? (
              undefined
            ) : (
              <EmptyListWarning
                image={require('../../assets/images/empty_orders.png')}
                description="No se encontraron reseñas para este usuario."
              />
            )
          }
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetchingAverage: Selectors.isFetchingAverageSelector(state),
    isFetchingUsersCalifications: Selectors.isFetchingUsersCalificationsSelector(state),
    califications: Selectors.calificationsSelector(state),
    average: Selectors.averageSelector(state)
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
)(Reputation);
