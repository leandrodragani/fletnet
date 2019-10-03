import styled from 'styled-components';

export const WidgetContainer = styled.View`
    flex: 1;
    padding: 5px;
    flex-direction: row;
    align-items: center;
`;

export const WidgetIconContainer = styled.View`
    flex: 0.5;
    align-items: center;
    padding: 5px;
`;

export const WidgetTextContainer = styled.View`
    flex: 0.5;
`;

export const WidgetValueText = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #454F63;
`;

export const WidgetLabelText = styled.Text`
    font-size: 12px;
    text-align: center;
    font-weight: 200;
    color: #959DAD;
`;
