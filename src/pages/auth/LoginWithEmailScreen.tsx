import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, TextInput } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, OutlinedInput, Text } from '@components';
import { EMAIL_REGEX } from '@constants';
import { useAuthData, useLocalizedData } from '@contexts';
import { LOGIN_MUTATION } from '@graphqlDocuments/auth.graphql';
import { useToastNotification } from '@hooks';
import { AuthLayout } from '@layouts';
import { AuthScreens } from '@routes/routes';
import { KsNavigation, Login, NativeAuthenticationResult } from '@types';

export const LoginWithEmailScreen: React.FC = () => {
  const navigation: KsNavigation = useNavigation();
  const { showGeneralErrorToast } = useToastNotification();

  const { dispatchUpdateLogin } = useAuthData();

  const defaultValues: Login.Variables = {
    username: '',
    password: '',
  };

  const { strings } = useLocalizedData();

  const [login, { loading: isLoading }] = useMutation<{ login: NativeAuthenticationResult }>(LOGIN_MUTATION, {
    onError: () => {
      showGeneralErrorToast();
    },
    onCompleted: ({ login: data }) => {
      switch (data.__typename) {
        case 'InvalidCredentialsError':
          setError('password', { type: 'value' });
          break;
        case 'CurrentUser':
          dispatchUpdateLogin({
            isLoggedIn: true,
            isGuestUser: false,
          });

          break;
        default:
          showGeneralErrorToast();
          break;
      }
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues,
  });

  const onSubmit: (data: Login.Variables) => void = (data: Login.Variables) => {
    void login({
      variables: {
        password: data.password,
        username: data.username,
      },
    });
    Keyboard.dismiss();
  };

  const navigateToPasswordReset: () => void = () => {
    navigation.navigate(AuthScreens.FORGET_PASSWORD_SCREEN, { emailAddress: getValues().username });
  };

  const navigateToLogin: () => void = () => {
    navigation.navigate(AuthScreens.LOGIN_SCREEN);
  };

  const passwordInput = useRef<TextInput>(null);

  return (
    <AuthLayout noBackground>
      <Box justifyContent="space-between" flex={1}>
        <Box>
          <Text variant="heading-3xl" marginVertical="s8">
            {strings.auth.login}
          </Text>

          <OutlinedInput
            isEmail
            error={errors?.username ? strings.auth.emailAddressValidation : null}
            control={control}
            rules={{
              required: true,
              pattern: EMAIL_REGEX,
            }}
            name="username"
            label={strings.auth.emailAddress}
            style={styles.emailInput}
            autoFocus
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              passwordInput.current?.focus();
            }}
          />
          <OutlinedInput
            isPassword
            inputRef={passwordInput}
            error={
              errors?.password
                ? errors.password.type === 'value'
                  ? strings.auth.noAccountFound
                  : strings.auth.passwordValidation
                : null
            }
            control={control}
            rules={{
              required: true,
              minLength: 8,
            }}
            name="password"
            label={strings.auth.password}
            autoComplete="password"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
          <Pressable onPress={navigateToPasswordReset} style={styles.forgetPasswordContainer}>
            <Text variant="text-sm" color="primary500" fontWeight="600" fontFamily="Inter-SemiBold">
              {strings.auth.forgetPassword}
            </Text>
          </Pressable>
        </Box>
        <Box>
          <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)} type={ButtonType.PRIMARY} marginBottom="s4">
            {strings.auth.login}
          </Button>
          <Button onPress={navigateToLogin} type={ButtonType.OUTLINE} marginBottom="s8">
            {strings.back}
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  emailInput: {
    marginBottom: theme.spacing.s8,
  },
  forgetPasswordContainer: {
    alignSelf: 'flex-end',
    width: 'auto',
    margin: theme.spacing.s4,
    marginRight: theme.spacing.s3,
  },
});
