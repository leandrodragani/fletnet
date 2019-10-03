import React, { Fragment } from 'react';
import { Icon } from "expo";
import { Divider } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { AddOrderItem } from '../list-item';
import { getDateToString, getTimeToString } from '../../../../utils/date-utils';

export const AddOrderSpecificationsItems = (props) => {
  const {
    withReturn,
    onWithReturnPress,
    assistant,
    onAssistantPress,
    orderDate,
    untilOrderTime,
    sinceOrderTime,
    onOrderDateChange,
    onSinceOrderTimeChange,
    onUntilOrderTimeChange
  } = props;

  return (
    <Fragment>
      <AddOrderItem
        title="Viaje con retorno"
        subtitle="En el caso de que el transportista tenga que volver al origen"
        leftIcon={(
          <Icon.MaterialCommunityIcons
            name="debug-step-over"
            color="#665EFF"
            size={25}
          />
        )}
        rightIcon={
          withReturn
            ? {
              name: 'check-circle',
              color: '#665EFF',
              style: { fontSize: 10 },
              type: 'font-awesome'
            }
            : {
              name: 'circle-thin',
              color: '#665EFF',
              style: { fontSize: 10 },
              type: 'font-awesome'
            }
        }
        onPress={onWithReturnPress}
      />
      <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 5, marginHorizontal: 20 }} />
      <AddOrderItem
        title="Con ayudante"
        subtitle="En el caso de que su pedido necesite mano de obra adicional"
        leftIcon={(
          <Icon.MaterialCommunityIcons
            name="account-multiple"
            color="#665EFF"
            size={25}
          />
        )}
        rightIcon={
          assistant
            ? {
              name: 'check-circle',
              color: '#665EFF',
              style: { fontSize: 10 },
              type: 'font-awesome'
            }
            : {
              name: 'circle-thin',
              color: '#665EFF',
              style: { fontSize: 10 },
              type: 'font-awesome'
            }
        }
        onPress={onAssistantPress}
      />
      <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 5, marginHorizontal: 20 }} />
      <AddOrderItem
        title="Fecha"
        subtitle="¿Que día prefiere que le envien/retiren el pedido?"
        leftIcon={<Icon.FontAwesome name="calendar" color="#665EFF" size={20} />}
        rightElement={(
          <DatePicker
            style={{ flex: 0.5 }}
            mode="date"
            placeholder="Pulsa para ingresar fecha"
            format="DD/MM/YYYY"
            date={orderDate}
            minDate={getDateToString(new Date())}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onDateChange={onOrderDateChange}
            showIcon={false}
            underlineColorAndroid="transparent"
            customStyles={{ dateInput: { borderWidth: 0 }, dateText: { color: '#454F63' } }}
          />
        )}
      />
      <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 5, marginHorizontal: 20 }} />
      <AddOrderItem
        title="Disponibilidad desde"
        subtitle="¿A partir de qué hora puede despachar el pedido?"
        leftIcon={(
          <Icon.MaterialCommunityIcons
            name="clock-start"
            color="#665EFF"
            size={20}
          />
        )}
        rightElement={(
          <DatePicker
            style={{ flex: 0.5 }}
            mode="time"
            placeholder="Pulsa para ingresar horario"
            date={sinceOrderTime}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onDateChange={onSinceOrderTimeChange}
            showIcon={false}
            underlineColorAndroid="transparent"
            customStyles={{ dateInput: { borderWidth: 0 }, dateText: { color: '#454F63' } }}
          />
        )}
      />
      <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 5, marginHorizontal: 20 }} />
      <AddOrderItem
        title="Disponibilidad hasta"
        subtitle="¿Hasta qué hora puede despachar el pedido?"
        leftIcon={
          <Icon.MaterialCommunityIcons name="clock-end" color="#665EFF" size={20} />
        }
        rightElement={(
          <DatePicker
            style={{ flex: 0.5 }}
            mode="time"
            placeholder="Pulsa para ingresar horario"
            date={untilOrderTime}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onDateChange={onUntilOrderTimeChange}
            showIcon={false}
            underlineColorAndroid="transparent"
            customStyles={{ dateInput: { borderWidth: 0 }, dateText: { color: '#454F63' } }}
          />
        )}
      />
    </Fragment>
  );
};
