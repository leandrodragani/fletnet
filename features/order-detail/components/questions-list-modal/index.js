/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'expo';
import { HeaderTitleText, CloseTouchable } from './styles';
import { Modal } from '../../../../components/modal';
import { QuestionsList } from '../questions-list';

export const QuestionsListModal = (props) => {
  const { visible, onRequestClose, questions, usertype, onPress, orderID, onPressQuestion } = props;

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      header
      headerColor="transparent"
      headerRight={
        <CloseTouchable onPress={onRequestClose}>
          <Icon.Ionicons name="ios-close" color="#454F63" size={35} />
        </CloseTouchable>
      }
      headerCenter={<HeaderTitleText>Preguntas</HeaderTitleText>}
    >
      <QuestionsList
        onPress={onPress}
        onPressQuestion={(item) => onPressQuestion(item)}
        questions={questions}
        usertype={usertype}
        mode="modal"
        orderID={orderID}
        visible={visible}
      />
    </Modal>
  );
};
