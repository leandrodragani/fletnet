import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const UserRatedTitleText = styled.Text`
  font-weight: 600;
  font-size: 17px;
  text-align: left;
  padding-horizontal: 10px;
  padding-top: 10px;
`;

export const OrderRatedTitleText = styled.Text`
  font-weight: 600;
  font-size: 17px;
  text-align: left;
  padding-horizontal: 10px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const TextInputContainer = styled.View`
  margin-vertical: 10px;
  margin-horizontal: 20px;
`;

export const UserRatedContainer = styled.View`
  align-self: stretch;
  margin-bottom: 12px;
`;

export const OrderRatedContainer = styled.View`
  align-self: stretch;
`;

export const AirbnbRatingContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  height: 50px;
  background-color: white;
  padding: 5px 0px 5px 8px; 
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  font-size: 14px;
  elevation: 7;
  align-self: stretch;
  border-radius: 15px;
  margin-horizontal : 20px;
  margin-vertical: 15px;
`;

export const HeaderTitle = styled.Text`
  text-align: left;
  font-size: 34px;
  font-weight: 600;
  padding-horizontal: 15px;
  padding-top: 5px;
  padding-bottom: 8px;
  color: #454f63;
`;

export const Card = styled.View`
  margin-horizontal: 20px;
  margin-bottom: 10px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: { 7, 0 };
  shadow-opacity: 0.1;
  shadow-radius: 7px;
  elevation: 7;
  border-radius: 12px;
`;

export const Label = styled.Text`
  color: #78849e;
  font-size: 12px;
  padding-bottom: 5px;
  margin-horizontal: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
