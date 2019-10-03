import React from 'react';
import {
  WidgetContainer, WidgetIconContainer, WidgetLabelText, WidgetTextContainer, WidgetValueText
} from './styles';

export const Widget = (props) => {
  const { icon, label, value } = props;
  return (
    <WidgetContainer>
      <WidgetIconContainer>
        {icon}
        <WidgetLabelText>{label}</WidgetLabelText>
      </WidgetIconContainer>
      {value !== undefined && (
      <WidgetTextContainer>
        <WidgetValueText>
          {value}
        </WidgetValueText>
      </WidgetTextContainer>
      )}
    </WidgetContainer>
  );
};
