import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StatusBar } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, OutlinedInput, Text } from '@components';
import { useAuthData, useLocalizedData } from '@contexts';
import { DELETE_CUSTOMER } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { DeleteCustomerMutation, DeleteCustomerMutationVariables, DeletionResult, KsNavigation } from '@types';

export const DeleteAccountScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();
  const { showGeneralErrorToast } = useToastNotification();
  const { dispatchUpdateLogin } = useAuthData();

  const DELETE_KEYWORD = strings.profileSettings.deleteAccount.keyword;
  const DELETE_REGEX = new RegExp(`${DELETE_KEYWORD}`);

  const [deleteCustomer] = useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DELETE_CUSTOMER, {
    onError: () => {
      showGeneralErrorToast();
    },
    onCompleted: (response) => {
      if (response.deleteCustomer.result === DeletionResult.Deleted) {
        dispatchUpdateLogin({ isLoggedIn: false, isGuestUser: false });
      } else {
        showGeneralErrorToast();
      }
    },
  });

  const defaultValues: { deleteKeyword: string } = {
    deleteKeyword: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async () => {
    Keyboard.dismiss();
    await deleteCustomer();
  };

  const cancel = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor={theme.colors.error500} barStyle="light-content" />

      <Box flex={1} justifyContent="space-between" paddingVertical="s5" paddingHorizontal="s3">
        <Box>
          <Text variant="heading-sm" textAlign="center" marginBottom="s4">
            {strings.profileSettings.deleteAccount.infoText1}
          </Text>

          <Text variant="text-sm" textAlign="center" marginBottom="s4">
            {strings.profileSettings.deleteAccount.infoText2.split('|')[0]}
            {'\n'}
            {strings.profileSettings.deleteAccount.infoText2.split('|')[1]}
            {'\n\n'}
            {strings.profileSettings.deleteAccount.confirm.split('|')[0]}
            <Text color="error500">{DELETE_KEYWORD}</Text>
            {strings.profileSettings.deleteAccount.confirm.split('|')[1]}
          </Text>

          <OutlinedInput
            control={control}
            name="deleteKeyword"
            error={errors.deleteKeyword ? strings.profileSettings.deleteAccount.invalidInput : null}
            placeholder={DELETE_KEYWORD}
            returnKeyType="send"
            rules={{
              required: true,
              pattern: DELETE_REGEX,
            }}
            blurOnSubmit={true}
            onBlur={handleSubmit(onSubmit)}
          />
        </Box>

        <Box>
          <Button onPress={handleSubmit(onSubmit)} type={ButtonType.PRIMARY_ERROR} marginBottom="s4">
            {strings.profileSettings.deleteAccount.deleteAccount}
          </Button>
          <Button onPress={cancel} type={ButtonType.PRIMARY_WHITE}>
            {strings.cancel}
          </Button>
        </Box>
      </Box>
    </>
  );
};
