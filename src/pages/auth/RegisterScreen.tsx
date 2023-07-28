import { useMutation } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, TextInput } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, Checkbox, ModalPopUp, OutlinedInput, Text } from '@components';
import { AGB_URL, DATA_PRIVACY_URL, EMAIL_REGEX } from '@constants';
import { useLocalizedData } from '@contexts';
import { LOGIN_MUTATION, REGISTRATION_MUTATION } from '@graphqlDocuments';
import { SocialButtonType, UserDetails, useSocialLoginMutation, useToastNotification } from '@hooks';
import { AuthLayout } from '@layouts';
import { AuthScreens } from '@routes/routes';
import {
  AppleAuthData,
  FacebookAuthInput,
  GoogleAuthInput,
  KsNavigation,
  KsRoute,
  Login,
  NativeAuthenticationResult,
  RegisterCustomerAccount,
} from '@types';
import { openUrlInAppBrowser } from '@utils';

interface RegistrationForm {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  isTermsAndConditionsChecked: boolean;
  isSubscriptionChecked: boolean;
}

export const RegisterScreen: React.FC = () => {
  const route = useRoute<KsRoute<UserDetails>>();
  const navigation: KsNavigation = useNavigation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { showGeneralErrorToast } = useToastNotification();

  const defaultValues: RegistrationForm = {
    firstName: route?.params?.firstName ?? '',
    lastName: route?.params?.lastName ?? '',
    emailAddress: route?.params?.email ?? '',
    password: '',
    phoneNumber: '',
    isTermsAndConditionsChecked: false,
    isSubscriptionChecked: false,
  };
  const { strings } = useLocalizedData();

  const [login, { loading: loginIsLoading }] = useMutation<{ login: NativeAuthenticationResult }, Login.Variables>(
    LOGIN_MUTATION,
    {
      onError: () => {
        showGeneralErrorToast();
      },
      onCompleted: ({ login: data }) => {
        switch (data.__typename) {
          case 'InvalidCredentialsError':
            setShowModal(true);
            break;
          case 'CurrentUser':
            navigation.navigate(AuthScreens.ADDRESS_SELECTION_SCREEN, {
              emailAddress: getValues().emailAddress,
            });

            break;
          default:
            showGeneralErrorToast();
            break;
        }
      },
    }
  );

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [registerCustomer, { loading: isLoading }] = useMutation<
    { registerCustomerAccount: RegisterCustomerAccount.SuccessInlineFragment },
    RegisterCustomerAccount.Variables
  >(REGISTRATION_MUTATION);

  const [socialLogin, { loading: isSocialLoginLoading }] = useSocialLoginMutation({
    loginType: (route?.params as UserDetails)?.loginType ?? null,
  } as UserDetails);

  const onSubmit = (data: RegistrationForm) => {
    // If any loginType is given, the social login should be used to handle the registration
    if ((route?.params as UserDetails)?.loginType) {
      let input: FacebookAuthInput | GoogleAuthInput | AppleAuthData;
      switch ((route.params as UserDetails).loginType) {
        case SocialButtonType.FACEBOOK:
          input = {
            id: (route?.params as UserDetails).id,
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.emailAddress,
            },
          };
          break;
        case SocialButtonType.GOOGLE:
          input = {
            token: (route?.params as UserDetails).id,
          };
          break;
        case SocialButtonType.APPLE:
          input = { token: (route?.params as UserDetails).id, firstName: data.firstName, lastName: data.lastName };
          break;
      }
      void socialLogin({
        variables: {
          input,
        },
      });
    } else {
      registerCustomer({
        variables: {
          input: {
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: data.emailAddress,
            password: data.password,
            phoneNumber: data.phoneNumber,
            customFields: { subscribeToNewsletterOnRegistration: data.isSubscriptionChecked },
          },
        },
      })
        .then((result) => {
          if (result?.data?.registerCustomerAccount.success) {
            void login({
              variables: {
                username: data.emailAddress,
                password: data.password,
              },
            });
          } else {
            showGeneralErrorToast();
          }
        })
        .catch(() => {
          showGeneralErrorToast();
        });
    }
    Keyboard.dismiss();
  };

  const openAGB = async () => {
    await openUrlInAppBrowser(AGB_URL);
  };

  const openDataPrivacy = async () => {
    await openUrlInAppBrowser(DATA_PRIVACY_URL);
  };

  const navigateToLogin = () => {
    navigation.navigate(AuthScreens.LOGIN_SCREEN);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalAndLogin = () => {
    closeModal();
    navigation.navigate(AuthScreens.LOGIN_SCREEN);
  };

  const lastNameInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const phoneNumberInput = useRef<TextInput>(null);

  return (
    <AuthLayout noBackground>
      <Box justifyContent="space-between" flex={1} marginTop="s8">
        <Box>
          <Text variant="heading-2xl">{strings.auth.registerScreenHeading}</Text>
          <Box flexDirection="row" marginVertical="s8">
            <Box flex={1} marginRight="s4">
              <OutlinedInput
                error={errors.firstName ? strings.auth.firstNameValidation : null}
                control={control}
                rules={{
                  required: true,
                }}
                name="firstName"
                label={strings.auth.firstName}
                autoCapitalize="words"
                autoComplete="name"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  lastNameInput.current?.focus();
                }}
              />
            </Box>

            <Box flex={1}>
              <OutlinedInput
                inputRef={lastNameInput}
                error={errors.lastName ? strings.auth.lastNameValidation : null}
                control={control}
                rules={{
                  required: true,
                }}
                name="lastName"
                label={strings.auth.lastName}
                autoCapitalize="words"
                // TODO: (Steffen) Comment in next line if https://github.com/facebook/react-native/issues/32557 is fixed
                // autoComplete="name-family"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  phoneNumberInput.current?.focus();
                }}
              />
            </Box>
          </Box>

          <OutlinedInput
            inputRef={phoneNumberInput}
            control={control}
            name="phoneNumber"
            label={strings.auth.phoneNumber}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              emailInput.current?.focus();
            }}
            error={null}
            keyboardType="number-pad"
          />

          <OutlinedInput
            isEmail
            inputRef={emailInput}
            error={errors.emailAddress ? strings.auth.emailAddressValidation : null}
            control={control}
            rules={{
              required: true,
              pattern: EMAIL_REGEX,
            }}
            name="emailAddress"
            label={strings.auth.emailAddress}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              passwordInput.current?.focus();
            }}
            style={styles.mt8}
          />

          {(route?.params as UserDetails)?.loginType ? null : (
            <>
              <OutlinedInput
                isPassword
                inputRef={passwordInput}
                error={errors.password ? strings.auth.passwordValidation : null}
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                }}
                name="password"
                label={strings.auth.password}
                style={styles.mt8}
                returnKeyType="done"
                // TODO: (Steffen) Comment in next line if https://github.com/facebook/react-native/issues/32557 is fixed
                // autoComplete="password-new"
              />
              {!errors?.password ? (
                <Text variant="text-xs" paddingLeft="s1">
                  {strings.auth.passwordValidation}
                </Text>
              ) : null}
            </>
          )}

          {/* Terms and Conditions, Subscription */}

          <Box flexDirection="row" alignItems="center" marginTop="s8" marginBottom="s4" paddingLeft="s1">
            <Checkbox
              isError={!!errors.isTermsAndConditionsChecked}
              control={control}
              rules={{
                required: true,
              }}
              name="isTermsAndConditionsChecked"
            />

            <Text
              variant="text-xs"
              marginLeft="s5"
              style={[
                styles.checkBoxText,
                {
                  color: errors.isTermsAndConditionsChecked ? theme.colors.error500 : theme.colors.defaultTextColor,
                },
              ]}
            >
              {strings.auth.termsText.split('|')[0]}{' '}
              <Text
                onPress={openAGB}
                fontWeight="600"
                fontFamily="Inter-SemiBold"
                style={{
                  color: errors.isTermsAndConditionsChecked ? theme.colors.error500 : theme.colors.primary500,
                }}
              >
                {strings.auth.termsText.split('|')[1]}
              </Text>
              {strings.auth.termsText.split('|')[2]}
              <Text
                onPress={openDataPrivacy}
                fontWeight="600"
                fontFamily="Inter-SemiBold"
                style={{
                  color: errors.isTermsAndConditionsChecked ? theme.colors.error500 : theme.colors.primary500,
                }}
              >
                {strings.auth.termsText.split('|')[3]}
              </Text>
              {strings.auth.termsText.split('|')[4]}
            </Text>
          </Box>

          <Box flexDirection="row" alignItems="center" marginBottom="s8" paddingLeft="s1">
            <Checkbox
              control={control}
              rules={{
                required: false,
              }}
              name="isSubscriptionChecked"
            />

            <Text variant="text-xs" style={styles.checkBoxText} marginLeft="s5">
              {strings.auth.subscriptionText}
            </Text>
          </Box>
        </Box>

        {/* Buttons for action handling */}
        <Box>
          <Button
            onPress={handleSubmit(onSubmit)}
            type={ButtonType.PRIMARY}
            isLoading={isLoading || loginIsLoading || isSocialLoginLoading}
            marginBottom="s4"
          >
            {strings.auth.registerNow}
          </Button>
          <Button onPress={navigateToLogin} type={ButtonType.OUTLINE} marginBottom="s8">
            {strings.auth.backToStart}
          </Button>
        </Box>
      </Box>

      <ModalPopUp
        isVisible={showModal}
        header={strings.auth.registerExistHeading}
        text={strings.auth.registerExistDetails}
        onClose={closeModal}
      >
        <Button type={ButtonType.PRIMARY} onPress={closeModalAndLogin}>
          {strings.auth.login}
        </Button>
        <Button type={ButtonType.OUTLINE} onPress={closeModal}>
          {strings.cancel}
        </Button>
      </ModalPopUp>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  mt8: {
    marginTop: theme.spacing.s8,
  },

  checkBoxText: {
    flexShrink: 1,
  },
});
