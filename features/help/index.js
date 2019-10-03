import React from 'react';
import { Platform, FlatList } from 'react-native';
import { Container } from '../../components/container';
import { HelpBodyText, HelpTitleText, HeaderTitle, Card } from './styles';
import { LanguageHelper } from '../../utils/helpers/language';

export default class Help extends React.Component {
  static navigationOptions = {
    title: '',
    headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0 }
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          key: '1',
          title: '¿Cómo hago para ganar dinero?',
          body:
            'Para ganar dinero debes ofertar a los pedidos que puedas transportar, si ganás la postulación, ya comenzas a ganar.'
        },
        {
          key: '2',
          title: '¿En qué horarios tengo que trabajar?',
          body: 'En el horario que te quede más cómodo, vos manejas tus horarios, tus tiempos.'
        }
      ]
    };
  }

  render() {
    const { items } = this.state;

    return (
      <Container>
        <HeaderTitle>Ayuda</HeaderTitle>
        <FlatList
          contentContainerStyle={{ marginTop: 15 }}
          data={items}
          removeClippedSubviews={Platform.OS === 'android'}
          renderItem={({ item }) => (
            <Card>
              <HelpTitleText>{item.title}</HelpTitleText>
              <HelpBodyText>{item.body}</HelpBodyText>
            </Card>
          )}
          keyExtractor={(item) => item.key}
        />
      </Container>
    );
  }
}
