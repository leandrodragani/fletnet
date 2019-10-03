import styled from 'styled-components';

export const ScrollView = styled.ScrollView``;

export const UserProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  resize-mode: contain;
  border-radius: 50px;
`;

export const AvatarContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 25px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-vertical: 20px;
`;

export const DocumentationButtonContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  align-self: stretch;
`;

export const GaleriaButtonContainer = styled.View`
  padding-top: 10px;
`;

export const DocumentationTitleText = styled.Text`
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  color: #454f63;
`;
