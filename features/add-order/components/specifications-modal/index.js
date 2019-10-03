import React, { Fragment } from 'react';
import DatePicker from 'react-native-datepicker';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Modal } from '../../../../components/modal';
import { AddOrderItem } from '../list-item';

export const SpecificationsModal = (props) => {
  const {
    orderDate,
    onOrderDateChange,
    sinceOrderTime,
    onSinceOrderTimeChange,
    untilOrderTime,
    onUntilOrderTimeChange,
    visible,
    onRequestClose,
    title
  } = props;

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} title="Más especificaciones" header>
      <AddOrderItem
        title="Fecha"
        subtitle="¿Que día prefiere que le envien/retiren el pedido?"
        leftIcon={<FontAwesome name="calendar" color="#1763aa" size={20} />}
        rightElement={(
          <DatePicker
            style={[{ width: 100 }]}
            mode="date"
            placeholder="Pulsa para ingresar fecha"
            format="DD/MM/YYYY"
            date={orderDate}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onDateChange={onOrderDateChange}
            showIcon={false}
            underlineColorAndroid="transparent"
            customStyles={{ dateInput: { borderWidth: 0 } }}
          />
        )}
      />
      <AddOrderItem
        title="Disponibilidad desde"
        subtitle="¿A partir de qué hora puede despachar el pedido?"
        leftIcon={(
          <MaterialCommunityIcons
            name="clock-start"
            color="#1763aa"
            size={20}
          />
        )}
        rightElement={(
          <DatePicker
            style={[{ width: 100 }]}
            mode="time"
            placeholder="Pulsa para ingresar horario"
            date={sinceOrderTime}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onDateChange={onSinceOrderTimeChange}
            showIcon={false}
            underlineColorAndroid="transparent"
            customStyles={{ dateInput: { borderWidth: 0 } }}
          />
          )}
      />
      <AddOrderItem
        title="Disponibilidad hasta"
        subtitle="¿Hasta qué hora puede despachar el pedido?"
        leftIcon={
          <MaterialCommunityIcons name="clock-end" color="#1763aa" size={20} />
        }
        rightElement={(
          <DatePicker
            style={[{ width: 100 }]}
            mode="time"
            placeholder="Pulsa para ingresar horario"
            date={untilOrderTime}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onDateChange={onUntilOrderTimeChange}
            showIcon={false}
            underlineColorAndroid="transparent"
            customStyles={{ dateInput: { borderWidth: 0 } }}
          />
          )}
      />
    </Modal>
  );
};
