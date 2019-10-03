import React, { Fragment } from 'react';
import { Modal as RNModal } from 'react-native';
import { Header } from 'react-native-elements';

export const Modal = (props) => {
  const { children, visible, onRequestClose, title, header, headerLeft, headerCenter, headerRight, headerColor, transparent } = props;
  return (
    <RNModal
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={transparent}
    >
      <Fragment>
        {header && (
          <Header
            leftComponent={headerLeft}
            centerComponent={headerCenter}
            rightComponent={headerRight}
            backgroundColor={headerColor}
            containerStyle={{
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomWidth: 0
            }}
          />
        )}
        {children}
      </Fragment>
    </RNModal>
  );
};
