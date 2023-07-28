import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { Box, Button, ButtonType, OutlinedInput } from '@components';
import { EMAIL_REGEX } from '@constants';
import { useLocalizedData } from '@contexts';
import { KsNavigation, MutationRequestPasswordResetArgs } from '@types';

interface Props {
  control: Control<MutationRequestPasswordResetArgs>;
  errors: FieldErrors;
  sendEmail: () => void;
  isLoading: boolean;
}

export const ForgotPasswordEmailInput: React.FC<Props> = (props) => {
  const navigation: KsNavigation = useNavigation();
  const { strings } = useLocalizedData();
  const { control, errors, sendEmail, isLoading } = props;

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <OutlinedInput
        isEmail
        error={errors.emailAddress ? strings.auth.emailAddressValidation : null}
        control={control}
        rules={{
          required: true,
          pattern: EMAIL_REGEX,
        }}
        name="emailAddress"
        label={strings.auth.emailAddress}
        onSubmitEditing={sendEmail}
        returnKeyType="send"
      />
      <Box marginTop="s8" marginBottom="s4">
        <Button onPress={sendEmail} type={ButtonType.PRIMARY} isLoading={isLoading} marginBottom="s4">
          {strings.auth.resetPassword}
        </Button>
        <Button onPress={navigateBack} type={ButtonType.OUTLINE} marginBottom="s4">
          {strings.auth.backToLogin}
        </Button>
      </Box>
    </>
  );
};
