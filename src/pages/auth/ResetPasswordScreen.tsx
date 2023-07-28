import { useMutation } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

import { Box, Button, ButtonType, OutlinedInput, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { RESET_PASSWORD_MUTATION } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { AuthLayout } from '@layouts';
import { AuthScreens } from '@routes/routes';
import { KsNavigation, KsRoute, ResetPasswordResult } from '@types';

interface ResetPasswordRouteParams {
  token: string;
}

export const ResetPasswordScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();
  const route = useRoute<KsRoute<ResetPasswordRouteParams>>();
  const { showGeneralErrorToast } = useToastNotification();
  const token: string = route?.params?.token ?? '';

  const [resetPassword, { loading: isLoading }] = useMutation<{ resetPassword: ResetPasswordResult }>(
    RESET_PASSWORD_MUTATION,
    {
      onError: () => {
        showGeneralErrorToast();
      },
      onCompleted: ({ resetPassword: data }) => {
        switch (data.__typename) {
          case 'CurrentUser':
            navigation.navigate(AuthScreens.LOGIN_WITH_EMAIL_SCREEN);
            break;
          default:
            showGeneralErrorToast();
            break;
        }
      },
    }
  );

  const defaultValues: { password: string } = {
    password: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit: (data: { password: string }) => void = (data: { password: string }) => {
    void resetPassword({ variables: { password: data.password, token } });
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <AuthLayout noBackground>
        <Box justifyContent="space-between" flex={1}>
          <Box>
            <Text variant="heading-3xl" marginVertical="s8">
              {strings.auth.newPassword}
            </Text>
            <OutlinedInput
              isPassword
              error={errors?.password ? strings.auth.passwordValidation : null}
              control={control}
              rules={{
                required: true,
                minLength: 8,
              }}
              name="password"
              label={strings.auth.newPassword}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(onSubmit)}
              // TODO: (Steffen) Comment in next line if https://github.com/facebook/react-native/issues/32557 is fixed
              // autoComplete="password-new"
            />
            {errors?.password ? null : (
              <Text variant="text-xs" paddingLeft="s1">
                {strings.auth.minimumCharacterMessage}
              </Text>
            )}
          </Box>

          <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading} type={ButtonType.PRIMARY} marginBottom="s8">
            {strings.auth.savePassword}
          </Button>
        </Box>
      </AuthLayout>
    </KeyboardAvoidingView>
  );
};
