import { useMutation } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

import { Box, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { REQUEST_PASSWORD_RESET_MUTATION } from '@graphqlDocuments/auth.graphql';
import { useToastNotification } from '@hooks';
import { AuthLayout } from '@layouts';
import { KsRoute, MutationRequestPasswordResetArgs, RequestPasswordReset } from '@types';
import { ForgotPasswordEmailInput } from './components/ForgotPasswordEmailInput';
import { PasswordRequestSuccess } from './components/PasswordRequestSuccess';

export const ForgetPasswordScreen: React.FC = () => {
  const route = useRoute<KsRoute<MutationRequestPasswordResetArgs>>();
  const { showGeneralErrorToast } = useToastNotification();

  const [isEmailSent, setIsEmailSent] = useState(false);

  const defaultValues: MutationRequestPasswordResetArgs = {
    emailAddress: route?.params?.emailAddress ?? '',
  };

  const { strings } = useLocalizedData();

  const [requestPasswordReset, { loading: isLoading }] = useMutation<
    {
      requestPasswordReset: RequestPasswordReset.RequestPasswordReset;
    },
    RequestPasswordReset.Variables
  >(REQUEST_PASSWORD_RESET_MUTATION, {
    notifyOnNetworkStatusChange: true,
    onError: () => {
      showGeneralErrorToast();
    },
    onCompleted: () => {
      setIsEmailSent(true);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data: MutationRequestPasswordResetArgs) => {
    void requestPasswordReset({ variables: data });
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <AuthLayout noBackground>
        <Text variant="heading-3xl" marginVertical="s8">
          {strings.auth.forgetPasswordHeading}
        </Text>
        <Box justifyContent="space-between" flex={1}>
          {isEmailSent ? (
            <PasswordRequestSuccess isLoading={isLoading} sendEmail={handleSubmit(onSubmit)} />
          ) : (
            <ForgotPasswordEmailInput
              control={control}
              errors={errors}
              isLoading={isLoading}
              sendEmail={handleSubmit(onSubmit)}
            />
          )}
        </Box>
      </AuthLayout>
    </KeyboardAvoidingView>
  );
};
