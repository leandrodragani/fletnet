import React from 'react';
import { ListItem } from 'react-native-elements';
import { ORDER_TYPE_EXPRESS, ORDER_TYPE_DISTRIBUTION } from '../../../../utils/constants/orders';
import { OrderTypeImage } from './styles';

export const OrderRated = (props) => {
  const { id, title, subtitle, type, date } = props;
  return (
    <ListItem
      leftAvatar={
        <OrderTypeImage
          resizeMethod="resize"
          source={(() => {
            let image = {};
            if (type === ORDER_TYPE_EXPRESS) {
              image = require('../../../../assets/images/icon_express.png');
            } else if (type === ORDER_TYPE_DISTRIBUTION) {
              image = require('../../../../assets/images/icon_distribution.png');
            }

            return image;
          })()}
        />
      }
      key={id}
      title={title}
      subtitle={subtitle}
      hideChevron
      containerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'transparent'
      }}
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
      rightTitleStyle={{
        fontWeight: '100',
        fontSize: 12,
        color: '#78849E'
      }}
      rightTitle={date}
      avatarContainerStyle={{ margin: 12 }}
    />
  );
};
