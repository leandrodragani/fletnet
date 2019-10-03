import styled from 'styled-components';

export const ButtonsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const ActivityIndicatorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  text-align: left;
  font-size: 40px;
  font-weight: 600;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  color: #FFFFFF;
`;

export const HeaderTitleContainer = styled.View`
  background-color: #2A2E43;
`;

export const WidgetsContainer = styled.View`
  flex: 1;
  background-color: #2A2E43;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 20px;
  margin-bottom: 10px;
`;

export const Card = styled.View`
  flex: 1;
  margin-horizontal: 10px;
  margin-bottom: 20px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  border-radius: 12px;
`;

export const Label = styled.Text`
  color: #78849E;
  font-size: 12px;
  padding-bottom: 5px;
  margin-horizontal: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
