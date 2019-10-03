import styled from 'styled-components';

export const LocationBox = styled.View`
  background: #fff;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 15px;
  flex-direction: row;
  margin: 30px;
  padding: 5px;
`;

export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #454f63;
`;

export const LocationDistanceBox = styled.View`
  background-color: #454f63;
  padding: 3px 8px;
`;

export const LocationDistanceText = styled.Text`
  color: #78849e;
  font-size: 14px;
  text-align: center;
`;

export const LocationDistanceTextSmall = styled.Text`
  color: #78849e;
  font-size: 12px;
  text-align: center;
`;
