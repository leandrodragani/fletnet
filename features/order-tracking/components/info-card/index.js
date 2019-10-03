import React, { Fragment } from 'react';
import { ActivityIndicator } from 'react-native';
import { Icon } from 'expo';
import { ListItem } from 'react-native-elements';
import { Button } from "../../../../components/button";
import {
  Container,
  LoadingContainer,
  CaptionText,
  SubtitleText,
  TitleText,
  Center,
  BottomContainer
} from './styles';

export const InfoCard = (props) => {
  const { title, subtitle, bottomElement, loading, onPress, image } = props;
  return (
    <Container onPress={onPress}>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator />
        </LoadingContainer>
      ) : (
        <Center>
          <Icon.Ionicons name="ios-arrow-up" color="#BBBCCD" size={20} />
          <TitleText>{title}</TitleText>
          <SubtitleText>{subtitle}</SubtitleText>
          <BottomContainer>
            {bottomElement !== undefined && bottomElement}
          </BottomContainer>
        </Center>
      )}
    </Container>
  );
};
