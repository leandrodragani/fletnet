import { Dimensions } from 'react-native';
import styled from 'styled-components';

export const Container = styled.View`
    width: ${Dimensions.get('window').width}
    height: ${Dimensions.get('window').height / 2 - 50}
    margin-horizontal: 8px;
`;
