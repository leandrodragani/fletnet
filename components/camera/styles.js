import styled from 'styled-components';

export const CameraButtonsContainer = styled.View`
  flex: 1;
  position: absolute;
  bottom: 10px;
  left: 0px;
  right: 0px;
  align-items: center;
  justify-content: center;
  flex-direction: row
`;

export const FlipButton = styled.TouchableOpacity`
  flex: 0.3;
  align-items: center;
  justify-content: center;
`;

export const TakeButton = styled.TouchableOpacity`
  flex: 0.3;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.TouchableOpacity`
  flex: 0.3;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.70);
  align-items: center;
  justify-content: center;
`;
