/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Icon } from 'expo';
import {
  QuestionContainer,
  QuestionTitleText,
  QuestionSubtitleText,
  ButtonContainer,
  CloseTouchable,
  QuestionTextInput
} from './styles';
import { Button } from '../../../../components/button';
import { Modal } from '../../../../components/modal';

export const QuestionModal = (props) => {
  const { onAskPress, visible, onRequestClose, onChangeQuestion, question, loading } = props;

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
    >
      <QuestionContainer>
        <QuestionTitleText>¿Tenés alguna duda?</QuestionTitleText>
        <QuestionSubtitleText>
          Preguntale a tu cliente acerca del pedido que tiene que transportar, por ejemplo, cual es
          su peso, sus dimensiones, etc.
        </QuestionSubtitleText>
        <QuestionTextInput
          placeholder="Ingresa tu pregunta..."
          keyboardType="default"
          onChangeText={onChangeQuestion}
          value={question}
          returnKeyType="done"
          maxLength={80}
          autoCapitalize="sentences"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          autoFocus
        />
        <ButtonContainer>
          <Button
            width="250px"
            color="#3497FD"
            radius
            onPress={onAskPress}
            title="ENVIAR"
            loading={loading}
            disabled={question.length === 0}
          />
        </ButtonContainer>
      </QuestionContainer>
    </Modal>
  );
};
