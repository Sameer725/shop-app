import { useMutation } from '@apollo/client';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, TextInput } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, OutlinedInput, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { UPDATE_PASSWORD } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { ProfileSettingsScreens } from '@routes/routes';
import { KsRoute, UpdateCustomerPassword } from '@types';
import { PasswordReset } from './components/PasswordReset';
import { BackFrom } from './PersonalData';

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

interface UpdatePasswordScreenParams {
  emailAddress: string;
}

const defaultValues: ChangePasswordForm = {
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
};

export const UpdatePasswordScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<KsRoute<UpdatePasswordScreenParams>>();
  const { strings } = useLocalizedData();
  const { showGeneralErrorToast } = useToastNotification();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateBackWithParam = () => {
    navigation.pop();
    navigation.replace(ProfileSettingsScreens.PERSONAL_DATA, { backFrom: BackFrom.UPDATE_EMAIL });
  };

  const [updatePassword, { loading: isLoading }] = useMutation<
    UpdateCustomerPassword.Mutation,
    UpdateCustomerPassword.Variables
  >(UPDATE_PASSWORD, {
    onError: () => {
      showGeneralErrorToast();
    },
    onCompleted: (data) => {
      switch (data?.updateCustomerPassword?.__typename) {
        case 'InvalidCredentialsError':
          setError('currentPassword', { type: 'value' });
          break;
        case 'Success':
          navigateBackWithParam();
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

  const onSubmit: (data: ChangePasswordForm) => void = (data: ChangePasswordForm) => {
    void updatePassword({
      variables: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
    });
    Keyboard.dismiss();
  };

  const currentPasswordInput = useRef<TextInput>(null);
  const newPasswordInput = useRef<TextInput>(null);
  const newPasswordRepeatInput = useRef<TextInput>(null);

  return (
    <Box backgroundColor="white" justifyContent="space-between" flex={1} paddingHorizontal="s3" paddingTop="s5">
      <Box>
        <OutlinedInput
          isPassword
          inputRef={currentPasswordInput}
          error={errors.currentPassword ? strings.profileSettings.personalData.passwordError : null}
          control={control}
          rules={{
            required: true,
            minLength: 8,
          }}
          name="currentPassword"
          label={strings.profileSettings.personalData.currentPassword}
          autoComplete="password"
          returnKeyType="next"
          onSubmitEditing={() => {
            newPasswordInput.current?.focus();
          }}
        />
        <PasswordReset emailAddress={route?.params?.emailAddress} />

        <Box width="100%" marginTop="s3" height={1} backgroundColor="gray100" />

        <>
          <OutlinedInput
            isPassword
            inputRef={newPasswordInput}
            error={errors.newPassword ? strings.auth.passwordValidation : null}
            control={control}
            rules={{
              required: true,
              minLength: 8,
            }}
            name="newPassword"
            label={strings.auth.newPassword}
            style={styles.passwordInput}
            returnKeyType="next"
            onSubmitEditing={() => {
              newPasswordRepeatInput.current?.focus();
            }}
          />
          {!errors?.newPassword ? (
            <Text variant="text-xs" paddingLeft="s1">
              {strings.auth.passwordValidation}
            </Text>
          ) : null}
        </>

        <OutlinedInput
          isPassword
          inputRef={newPasswordRepeatInput}
          error={errors.newPasswordRepeat ? strings.profileSettings.personalData.passwordNotMatch : null}
          control={control}
          rules={{
            required: true,
            validate: (value: string) => {
              const { newPassword } = getValues();
              return value === newPassword;
            },
          }}
          name="newPasswordRepeat"
          label={strings.profileSettings.personalData.repeatPassword}
          style={styles.passwordInput}
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </Box>

      <Box>
        <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)} type={ButtonType.PRIMARY} marginBottom="s4">
          {strings.profileSettings.personalData.saveNewPassword}
        </Button>
        <Button onPress={navigateBack} type={ButtonType.OUTLINE} marginBottom="s8">
          {strings.back}
        </Button>
      </Box>
    </Box>
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
  passwordInput: {
    marginTop: theme.spacing.s4,
  },
});
