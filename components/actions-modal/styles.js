import styled from 'styled-components';

export const StyledModal = styled.Modal`
  flex: 1;
`;

export const Container = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: ${(props) => (props.type === 'dark' ? '#2A2E43' : 'white')};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  align-self: stretch;
  z-index: 1000;
`;

export const ActionsTitle = styled.Text`
  color: ${(props) => (props.type === 'dark' ? 'white' : '#454F63')};
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  padding-horizontal: 10px;
  padding-vertical: 15px;
`;

export const ActionsContainer = styled.View`
  align-items: center;
  padding-vertical: 20px;
  padding-horizontal: 10px;
`;

export const OutsideTouchable = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Divider = styled.View`
  height: 15px;
`;
