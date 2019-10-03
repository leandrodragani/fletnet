import React from 'react';
import {
  StyledModal,
  ActionsContainer,
  ActionsTitle,
  Container,
  OutsideTouchable,
  Divider,
  Overlay
} from './styles';

export const ActionsModal = ({ title, children, type, visible, onRequestClose }) => {
  return (
    <StyledModal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent>
      <>
        <OutsideTouchable onPress={onRequestClose}>
          <Overlay />
        </OutsideTouchable>
        <Container type={type}>
          <ActionsTitle type={type}>{title}</ActionsTitle>
          <ActionsContainer>
            {React.Children.map(children, (child) => (
              <>
                {child}
                <Divider />
              </>
            ))}
          </ActionsContainer>
        </Container>
      </>
    </StyledModal>
  );
};
