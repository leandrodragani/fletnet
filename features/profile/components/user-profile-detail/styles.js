import styled from 'styled-components';

export const UserProfileContainer = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
  background-color: #2A2E43;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const UserProfileTouchable = styled.TouchableOpacity`
  flex: 1.5;
  align-items: center;
  justify-content: center;
  padding-vertical: 30px;
  padding-horizontal: 40px;
  padding: 60px 10px 10px 10px;
`;

export const UserProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  resize-mode: cover;
  border-radius: 15px;
`;

export const UserProfileInfoTextContainer = styled.View`
  flex: 1;
  padding: 25px;
`;

export const UsernameText = styled.Text`
  font-weight: 600;
  color: white;
  font-size: 24px;
  text-align: center;
`;

export const RegisterDateText = styled.Text`
  color: #78849E;
  font-size: 12px;
  top: 10px;
  text-align: center;
`;

export const EditTouchable = styled.TouchableOpacity`
  padding: 20px;
`;
