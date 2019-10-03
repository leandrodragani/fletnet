import styled, { css } from 'styled-components';

export const HorizontalFlatList = styled.FlatList`
  padding: 5px;
  margin-bottom: -10px;
`;

export const VehicleTypeTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: transparent;
  ${(props) =>
    props.selected &&
    css`
      background-color: #3acce1;
    `}
  border-radius: 15px;
  padding: 5px;
`;

export const VehicleImage = styled.Image`
  flex: 0.7;
  resize-mode: contain;
  margin-horizontal: 15px;
`;

export const VehicleDescriptionText = styled.Text`
  top: 2px;
  bottom: 10px;
  color: #454f63;
  font-size: 18px;
`;
