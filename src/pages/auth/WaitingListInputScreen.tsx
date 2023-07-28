import { useMutation } from '@apollo/client';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useForm, Validate } from 'react-hook-form';
import { Keyboard, TextInput } from 'react-native';

import { Box, Button, ButtonType, OutlinedInput, Text } from '@components';
import { EMAIL_REGEX, POSTAL_CODE_REGEX } from '@constants';
import { useLocalizedData } from '@contexts';
import { CREATE_WAITING_LIST_MUTATION } from '@graphqlDocuments/auth.graphql';
import { useToastNotification } from '@hooks';
import { AuthLayout } from '@layouts';
import { AuthScreens } from '@routes/routes';
import { CreateWaitingList, CreateWaitingListMutation } from '@types';

export const WaitingListInputScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { showGeneralErrorToast } = useToastNotification();

  const defaultValues: CreateWaitingList.Variables = {
    email: '',
    postalCode: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [createWaitingList, { loading: isLoading }] = useMutation<CreateWaitingListMutation>(
    CREATE_WAITING_LIST_MUTATION,
    {
      onError: () => {
        showGeneralErrorToast();
      },
      onCompleted: ({ createWaitingList: data }) => {
        if (data.id) {
          navigation.navigate(AuthScreens.WAITING_LIST_SUCCESS_SCREEN);
        }
      },
    }
  );

  const navigateToWaitingListLandingScreen = (): void => {
    navigation.navigate(AuthScreens.BROWSE_AS_GUEST_SCREEN);
  };

  const onSubmit: (data: CreateWaitingList.Variables) => void = (data: CreateWaitingList.Variables) => {
    void createWaitingList({
      variables: {
        email: data.email,
        postalCode: data.postalCode,
      },
    });
    Keyboard.dismiss();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateNumber: Validate<string> = (score: string): boolean => !isNaN(Number(score));

  const postalCodeInput = useRef<TextInput>(null);

  return (
    <AuthLayout noBackground>
      <Box justifyContent="space-between" flex={1}>
        <Box marginVertical="s8">
          <Text variant="heading-3xl">{strings.auth.waitingListGoToButton}</Text>
          <Text variant="heading-xs" marginTop="s5">
            {strings.auth.waitingListInputInfo}
          </Text>

          <Box marginTop="s8">
            <OutlinedInput
              isEmail
              error={errors?.email ? strings.auth.emailAddressValidation : null}
              control={control}
              rules={{
                required: true,
                pattern: EMAIL_REGEX,
              }}
              name="email"
              label={strings.auth.emailAddress}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                postalCodeInput.current?.focus();
              }}
            />
          </Box>
          <Box marginTop="s8">
            <OutlinedInput
              inputRef={postalCodeInput}
              error={errors?.postalCode ? strings.auth.postalValidation : null}
              control={control}
              rules={{
                required: true,
                pattern: POSTAL_CODE_REGEX,
                validate: validateNumber,
              }}
              name="postalCode"
              label={strings.auth.postalCode}
              keyboardType="number-pad"
              autoComplete="postal-code"
              returnKeyType="send"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>

        <Box marginVertical="s8">
          <Button onPress={handleSubmit(onSubmit)} type={ButtonType.PRIMARY} isLoading={isLoading} marginBottom="s4">
            {strings.auth.waitingListGoToButton}
          </Button>
          <Button onPress={navigateToWaitingListLandingScreen} type={ButtonType.OUTLINE}>
            {strings.back}
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  );
};
