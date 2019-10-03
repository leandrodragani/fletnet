import styled from 'styled-components';

export const WidgetContainer = styled.View`
  flex-basis: 45%;
  background-color: #353a50;
  padding: 15px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const WidgetDescriptionContainer = styled.View`
  margin-left: 10px;
`;

export const WidgetLabel = styled.Text`
  color: #959dad;
  margin-bottom: 3px;
  font-size: 12px;
`;

export const WidgetValue = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;
