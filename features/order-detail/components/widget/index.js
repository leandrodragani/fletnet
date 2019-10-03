import React from 'react';
import { Icon } from 'expo';
import { WidgetContainer, WidgetDescriptionContainer, WidgetLabel, WidgetValue } from './styles';

export const Widget = (props) => {
  const { value, label, icon } = props;
  return (
    <WidgetContainer>
      <Icon.Ionicons name={icon} color="#959DAD" size={15} />
      <WidgetDescriptionContainer>
        <WidgetLabel>{label}</WidgetLabel>
        <WidgetValue>
          {value}
        </WidgetValue>
      </WidgetDescriptionContainer>
    </WidgetContainer>
  );
};
