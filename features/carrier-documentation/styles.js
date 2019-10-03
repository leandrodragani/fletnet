import styled, { css } from 'styled-components';

export const DocumentationContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const DocumentationTitleText = styled.Text`
  text-align: left;
  font-size: 36px;
  font-weight: 600;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  color: #454f63;
`;

export const DocumentationSubtitleText = styled.Text`
  text-align: center;
  font-weight: 200;
  font-size: 16px;
  color: #959dad;
  padding: 20px;
`;

export const DocumentationButtonContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  margin-vertical: 20px;
`;

export const NextButtonTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const NextButtonText = styled.Text`
  text-align: center;
  font-weight: 200;
  font-size: 13px;

  ${(props) =>
    props.disabled
      ? css`
          font-weight: 200;
          color: gray;
        `
      : css`
          font-weight: 600;
          color: #665eff;
        `}
`;

export const DocumentationImage = styled.Image`
  width: 240px;
  height: 180px;
  resize-mode: contain;
  margin-bottom: 20px;
`;
