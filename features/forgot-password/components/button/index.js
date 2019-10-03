import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
    ForgotPasswordTouchable,
    ForgotPasswordText
} from './styles';
import { LanguageHelper } from '../../../../utils/helpers/language';

export const ForgotPasswordButton = (props) => {
    const { loading, onPress } = props;
    return (
        <ForgotPasswordTouchable onPress={onPress}>
            {loading && <ActivityIndicator color="white" />}
            <ForgotPasswordText loading={loading}>{LanguageHelper.getLanguage().forgot_password_text}</ForgotPasswordText>
        </ForgotPasswordTouchable>
    );
};