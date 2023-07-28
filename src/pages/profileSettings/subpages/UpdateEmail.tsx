import { useMutation } from '@apollo/client';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, TextInput } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, OutlinedInput } from '@components';
import { EMAIL_REGEX } from '@constants';
import { useLocalizedData } from '@contexts';
import { UPDATE_EMAIL } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { ProfileSettingsScreens } from '@routes/routes';
import { KsRoute, RequestUpdateCustomerEmailAddress } from '@types';
import { PasswordReset } from './components/PasswordReset';
import { BackFrom } from './PersonalData';

interface UpdateEmailScreenParams {
  emailAddress: string;
}

const defaultValues: RequestUpdateCustomerEmailAddress.Variables = {
  newEmailAddress: '',
  password: '',
};

export const UpdateEmailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<KsRoute<UpdateEmailScreenParams>>();
  const { strings } = useLocalizedData();
  const { showGeneralErrorToast } = useToastNotification();

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateBackWithParam = () => {
    navigation.pop();
    navigation.replace(ProfileSettingsScreens.PERSONAL_DATA, { backFrom: BackFrom.UPDATE_EMAIL });
  };

  const [updateEmail, { loading: isLoading }] = useMutation<
    RequestUpdateCustomerEmailAddress.Mutation,
    RequestUpdateCustomerEmailAddress.Variables
  >(UPDATE_EMAIL, {
    notifyOnNetworkStatusChange: true,
    onError: () => {
      showGeneralErrorToast();
    },
    onCompleted: (data) => {
      switch (data?.requestUpdateCustomerEmailAddress?.__typename) {
        case 'EmailAddressConflictError':
          setError('newEmailAddress', { type: 'value' });
          break;
        case 'InvalidCredentialsError':
          setError('password', { type: 'value' });
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
  } = useForm({
    defaultValues,
  });

  const onSubmit: (data: RequestUpdateCustomerEmailAddress.Variables) => void = (
    data: RequestUpdateCustomerEmailAddress.Variables
  ) => {
    void updateEmail({
      variables: data,
    });
    Keyboard.dismiss();
  };

  const newEmailAddressInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);

  return (
    <Box backgroundColor="white" justifyContent="space-between" flex={1} paddingHorizontal="s3" paddingTop="s5">
      <Box>
        <OutlinedInput
          isEmail
          inputRef={newEmailAddressInput}
          error={
            errors.newEmailAddress
              ? errors.newEmailAddress.type === 'value'
                ? strings.profileSettings.personalData.emailNotAvailable
                : strings.auth.emailAddressValidation
              : null
          }
          control={control}
          rules={{
            required: true,
            pattern: EMAIL_REGEX,
          }}
          name="newEmailAddress"
          label={strings.profileSettings.personalData.newEmailAddress}
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInput.current?.focus();
          }}
          style={{ marginBottom: theme.spacing.s8 }}
        />
        <OutlinedInput
          isPassword
          inputRef={passwordInput}
          error={
            errors.password
              ? errors.password.type === 'value'
                ? strings.profileSettings.personalData.passwordError
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
          autoComplete="email"
          returnKeyType="next"
          onSubmitEditing={handleSubmit(onSubmit)}
        />
        <PasswordReset emailAddress={route?.params?.emailAddress} />
      </Box>

      <Box>
        <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)} type={ButtonType.PRIMARY} marginBottom="s4">
          {strings.profileSettings.personalData.saveNewEmailAddress}
        </Button>
        <Button onPress={navigateBack} type={ButtonType.OUTLINE} marginBottom="s8">
          {strings.back}
        </Button>
      </Box>
    </Box>
  );
};
