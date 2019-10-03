import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const CloseTouchable = styled.TouchableOpacity`
    right: 8px;
    top: 10px;
    padding: 5px;
`;

export const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 30px;
  margin-vertical: 4px;
  color: white;
`;

export const TitleText = styled.Text`
  font-weight: 600;
  font-size: 24px;
  margin-vertical: 4px;
  color: white;
`;

export const SubtitleText = styled.Text`
  font-size: 16px;
  margin-vertical: 4px;
  color: #959DAD;
`;

export const RowContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin-vertical: 20px;
`;

export const Container = styled.View`
  flex: 1;
  margin: 8px;
  background-color: transparent;
  width: ${Dimensions.get('window').width - 30}
  padding: 10px;
  border-radius: 15px;
`;

export const CancelButtonContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

export const StatusWidgetContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-basis: 45%;
  background-color: #353A50;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;
