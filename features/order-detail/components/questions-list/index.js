import React, { Fragment } from 'react';
import { FlatList, Platform, Dimensions } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { Icon } from 'expo';
import { Button } from '../../../../components/button';
import {
  EmptyQuestionsListContainer,
  EmptyQuestionsListText,
  ShowMoreTouchable,
  ShowMoreTouchableText,
  UsernameText,
  QuestionText
} from './styles';
import { CARRIER_USER_TYPE, CLIENT_USER_TYPE } from '../../../../utils/constants/users';
import { getDatePersonalized } from '../../../../utils/date-utils';

export const QuestionsList = (props) => {
  const { questions, usertype, onPress, mode, orderID, onPressQuestion, visible } = props;
  return (
    <Fragment>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        removeClippedSubviews={Platform.OS === 'android'}
        data={questions}
        ListEmptyComponent={
          <EmptyQuestionsListContainer>
            <EmptyQuestionsListText>
              No se realizaron preguntas{' '}
              {usertype === CARRIER_USER_TYPE ? ', sé el primero!' : null}
            </EmptyQuestionsListText>
          </EmptyQuestionsListContainer>
        }
        ItemSeparatorComponent={() => (
          <Divider style={{ backgroundColor: '#F4F4F6', marginVertical: 10 }} />
        )}
        renderItem={({ item }) => (
          <ListItem
            disabled={usertype === CARRIER_USER_TYPE || item.answer !== undefined}
            onPress={
              visible
                ? () => {
                    onPressQuestion({
                      question: item.question,
                      orderID,
                      questionID: item.id,
                      sender: item.carrier_uid
                    });
                  }
                : () => {}
            }
            title={
              <Fragment>
                <UsernameText>{item.carrier_username.toUpperCase()}</UsernameText>
                <QuestionText>{item.question}</QuestionText>
              </Fragment>
            }
            subtitle={
              item.answer !== undefined
                ? item.answer
                : usertype === CLIENT_USER_TYPE && visible
                ? 'Pulsa aquí para responder.'
                : ''
            }
            subtitleStyle={{
              fontSize: 14,
              color: '#78849E'
            }}
            rightTitleStyle={{
              fontWeight: '100',
              fontSize: 11
            }}
            containerStyle={{
              marginHorizontal: 10
            }}
            rightTitle={getDatePersonalized(new Date(item.timestamp))}
            leftIcon={<Icon.Ionicons name="ios-chatbubbles" color="#665EFF" size={20} />}
          />
        )}
        keyExtractor={(item) => item.timestamp}
      />
      {(() => {
        let bottomButton;
        if (mode !== 'modal') {
          bottomButton = (
            <ShowMoreTouchable onPress={onPress}>
              <ShowMoreTouchableText>Pulsa para ver más</ShowMoreTouchableText>
            </ShowMoreTouchable>
          );
        } else if (usertype === CARRIER_USER_TYPE) {
          bottomButton = (
            <ShowMoreTouchable onPress={onPress}>
              <Button
                width={Dimensions.get('window').width - 25}
                color="#665EFF"
                radius
                onPress={onPress}
                title="REALIZAR PREGUNTA"
              />
            </ShowMoreTouchable>
          );
        }
        return (
          <Fragment>
            <Divider
              style={{ backgroundColor: '#F4F4F6', marginBottom: 5, marginHorizontal: 10 }}
            />
            {bottomButton}
          </Fragment>
        );
      })()}
    </Fragment>
  );
};
