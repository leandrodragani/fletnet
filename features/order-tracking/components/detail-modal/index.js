import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { Icon } from 'expo';
import { Modal } from '../../../../components/modal';
import { Button } from '../../../../components/button';
import {
  CloseTouchable,
  TitleText,
  RowContainer,
  Container,
  CancelButtonContainer,
  SubtitleText,
  ActionButton,
  HeaderText
} from './styles';
import { Trip } from '../../../../components/trip';
import { CLIENT_USER_TYPE } from '../../../../utils/constants/users';
import { getClientTrackingStatusText } from '../../../../utils/order-utils';
import { Widget } from '../widget';

export const DetailModal = (props) => {
  const {
    visible,
    onRequestClose,
    onPressViewProfile,
    onPressCancelOrder,
    onPressCall,
    onPressChat,
    profile,
    trackingStatus,
    usertype,
    origin,
    destination,
    duration,
    distance,
    value,
    sinceTime,
    untilTime,
    orderDate,
    assistant,
    withReturn,
    uriIMG
  } = props;
  const { width } = Dimensions.get('window');
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      header
      headerColor="#2A2E43"
      headerRight={
        <CloseTouchable onPress={onRequestClose}>
          <Icon.Ionicons name="ios-close" color="white" size={26} />
        </CloseTouchable>
      }
    >
      <ScrollView
        style={{ backgroundColor: '#2A2E43' }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Container>
          <HeaderText>Tu pedido</HeaderText>
          <ListItem
            titleStyle={{ fontSize: 18, fontWeight: '600', color: 'white' }}
            title={profile.title}
            subtitleStyle={{ fontSize: 14, color: '#959DAD', marginTop: 8 }}
            subtitle="Ver perfil"
            containerStyle={{
              paddingHorizontal: 0,
              paddingVertical: 15,
              backgroundColor: '#2A2E43'
            }}
            leftAvatar={{
              source:
                uriIMG == ''
                  ? require('../../../../assets/images/user_profile.png')
                  : { uri: uriIMG },
              size: 'medium'
            }}
            rightElement={
              <RowContainer>
                <ActionButton onPress={onPressChat}>
                  <Icon.Ionicons name="ios-chatbubbles" color="white" size={20} />
                </ActionButton>
                {usertype === CLIENT_USER_TYPE && (
                  <ActionButton onPress={onPressCall}>
                    <Icon.Ionicons name="ios-call" color="white" size={20} />
                  </ActionButton>
                )}
              </RowContainer>
            }
            onPress={onPressViewProfile}
          />
          <Divider style={{ backgroundColor: '#707070', marginBottom: 15, opacity: 0.2 }} />
          <TitleText>Estado</TitleText>
          <SubtitleText>{getClientTrackingStatusText(trackingStatus)}</SubtitleText>
          <RowContainer>
            <Widget value={sinceTime + ' hs'} label="A partir de" icon="ios-navigate" />
            <Widget value={'$' + value} label="Tarifa a pagar" icon="ios-cash" />
            <Widget value={assistant ? 'Si' : 'No'} label="Ayudante" icon="md-person" />
            <Widget value={withReturn ? 'Si' : 'No'} label="Retorno" icon="ios-return-left" />
            <Widget value={orderDate} label="Fecha a realizar" icon="ios-calendar" />
            <Widget
              value={untilTime == '' ? 'A elección' : untilTime + ' hs'}
              label="Horario limite"
              icon="ios-timer"
            />
          </RowContainer>
          <Divider style={{ backgroundColor: '#707070', marginBottom: 15, opacity: 0.2 }} />
          <TitleText>Tu viaje</TitleText>
          <Trip origin={origin} destinations={destination} dark />
          <RowContainer>
            <Widget value={duration} label="Duración" icon="ios-timer" />
            <Widget value={distance} label="Recorrido" icon="ios-map" />
          </RowContainer>
          <CancelButtonContainer>
            <Button
              width={width - 60}
              color="#444F63"
              radius
              onPress={onPressCancelOrder}
              title="CANCELAR PEDIDO"
            />
          </CancelButtonContainer>
        </Container>
      </ScrollView>
    </Modal>
  );
};
