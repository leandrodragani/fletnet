import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Icon } from 'expo';
import { WidgetContainer, WidgetDescriptionContainer, WidgetLabel, WidgetValue } from './styles';

export const Widget = (props) => {
  const { value, label, icon, loading } = props;
  return (
    <WidgetContainer>
      <Icon.Ionicons name={icon} color="#959DAD" size={15} />
      <WidgetDescriptionContainer>
        <WidgetLabel>{label}</WidgetLabel>
        {loading ? (
          <ActivityIndicator style={{ padding: 10 }} />
        ) : (
          <WidgetValue>{value}</WidgetValue>
        )}
      </WidgetDescriptionContainer>
    </WidgetContainer>
  );
};
