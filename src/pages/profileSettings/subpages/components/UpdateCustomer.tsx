import { MutationHookOptions, useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Checkbox, OutlinedInput, ShadowBox, Text } from '@components';
import { useAuthData, useLocalizedData } from '@contexts';
import {
  CHECK_NEWSLETTER_SUBSCRIPTION,
  SUBSCRIBE_TO_NEWSLETTER,
  UNSUBSCRIBE_FROM_NEWSLETTER,
  UPDATE_CUSTOMER,
} from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { ProfileSettingsScreens } from '@routes/routes';
import {
  AuthMethod,
  CheckIsSubscribedToNewsletterQuery,
  Customer,
  KsNavigation,
  SubscribeToNewsletterMutation,
  UnsubscribeFromNewsletterMutation,
  UpdateCustomerInput,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from '@types';
import { CustomerInfoCard } from './CustomerInfoCard';

interface UpdateCustomerProps {
  customer: Customer | undefined;
}

export const UpdateCustomer: React.FC<UpdateCustomerProps> = (props) => {
  const { customer } = props;
  const { showGeneralErrorToast, showInfoToast } = useToastNotification();
  const { strings } = useLocalizedData();
  const { dispatchUpdateUser } = useAuthData();
  const navigation: KsNavigation = useNavigation();

  const isNativeAuthenticationMethod =
    customer?.user?.authenticationMethods?.map((method) => method.strategy)?.includes(AuthMethod.NATIVE) ?? false;
  const authenticationMethod = customer?.user?.authenticationMethods?.[0]?.strategy;

  const defaultValues: UpdateCustomerInput & { emailAddress?: string; isSubscriptionChecked: boolean } = {
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    phoneNumber: customer?.phoneNumber ?? '',
    isSubscriptionChecked: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues,
  });

  const [updateCustomer] = useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UPDATE_CUSTOMER, {
    onError: () => {
      showGeneralErrorToast();
    },
    onCompleted: (response) => {
      const firstName: string = response?.updateCustomer?.firstName;
      if (!firstName) {
        return;
      }
      // Update locally stored first name of the user
      dispatchUpdateUser({
        firstName,
      });
    },
  });

  const onSubmit = (inputData: Partial<UpdateCustomerInput>) => {
    void updateCustomer({
      variables: {
        input: {
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          phoneNumber: inputData.phoneNumber,
        },
      },
    });
  };

  // Newsletter subscription changes
  const { data: isSubscribedToNewsletter } =
    useQuery<CheckIsSubscribedToNewsletterQuery>(CHECK_NEWSLETTER_SUBSCRIPTION);

  const newsletterMutationOptions: MutationHookOptions = {
    update: (cache) => {
      // Remove cache for CHECK_NEWSLETTER_SUBSCRIPTION query
      cache.evict({ fieldName: 'checkIsSubscribedToNewsletter' });

      cache.gc();
    },
  };
  const [subscribeToNewsletter] = useMutation<SubscribeToNewsletterMutation>(
    SUBSCRIBE_TO_NEWSLETTER,
    newsletterMutationOptions
  );
  const [unsubscribeFromNewsletter] = useMutation<UnsubscribeFromNewsletterMutation>(
    UNSUBSCRIBE_FROM_NEWSLETTER,
    newsletterMutationOptions
  );

  useEffect(() => {
    if (
      isSubscribedToNewsletter?.checkIsSubscribedToNewsletter === false ||
      isSubscribedToNewsletter?.checkIsSubscribedToNewsletter === true
    ) {
      setValue('isSubscriptionChecked', isSubscribedToNewsletter?.checkIsSubscribedToNewsletter);
    }
  }, [isSubscribedToNewsletter]);

  const handleSubscriptionChange = () => {
    if (!getValues().isSubscriptionChecked) {
      void subscribeToNewsletter();
    } else {
      void unsubscribeFromNewsletter();
    }

    // Show Info toast right away, since the request may take a while
    showInfoToast(strings.profileSettings.personalData.newsletterChangeSuccess);
  };

  const navigateToUpdateEmail = useCallback(() => {
    navigation.navigate(ProfileSettingsScreens.UPDATE_EMAIL, {
      emailAddress: customer?.emailAddress ?? '',
    });
  }, [customer]);

  const navigateToUpdatePassword = useCallback(() => {
    navigation.navigate(ProfileSettingsScreens.CHANGE_PASSWORD, {
      emailAddress: customer?.emailAddress ?? '',
    });
  }, [customer]);

  return (
    <Box>
      <ShadowBox
        backgroundColor="white"
        borderRadius={theme.radii['2xl']}
        containerViewStyle={styles.containerViewStyle}
      >
        <Box flexDirection="row">
          <OutlinedInput
            style={styles.firstNameInput}
            control={control}
            rules={{
              required: true,
              minLength: 2,
            }}
            name="firstName"
            label={strings.profileSettings.personalData.firstName}
            returnKeyType="done"
            error={errors.firstName ? strings.profileSettings.personalData.nameError : null}
            onSubmitEditing={handleSubmit(onSubmit)}
            onBlur={handleSubmit(onSubmit)}
          />
          <OutlinedInput
            style={styles.lastNameInput}
            control={control}
            rules={{
              required: true,
              minLength: 2,
            }}
            name="lastName"
            label={strings.profileSettings.personalData.lastName}
            returnKeyType="done"
            error={errors.lastName ? strings.profileSettings.personalData.nameError : null}
            onSubmitEditing={handleSubmit(onSubmit)}
            onBlur={handleSubmit(onSubmit)}
          />
        </Box>

        <Box flexDirection="row">
          <OutlinedInput
            style={[styles.numberInput, { marginTop: theme.spacing.s5 }]}
            control={control}
            name="phoneNumber"
            label={strings.profileSettings.personalData.phoneNumber}
            returnKeyType="done"
            error={null}
            onSubmitEditing={handleSubmit(onSubmit)}
            onBlur={handleSubmit(onSubmit)}
            keyboardType="number-pad"
          />
        </Box>
      </ShadowBox>

      {isNativeAuthenticationMethod ? (
        <>
          <CustomerInfoCard
            label={strings.auth.emailAddress}
            value={customer?.emailAddress ?? ''}
            onPress={navigateToUpdateEmail}
          />
          <CustomerInfoCard
            label={strings.auth.password}
            value={'***************'}
            onPress={navigateToUpdatePassword}
          />
        </>
      ) : (
        <CustomerInfoCard
          label={strings.auth.emailAddress}
          value={customer?.emailAddress ?? ''}
          authenticationMethod={authenticationMethod}
        />
      )}

      <Box flexDirection="row" alignItems="center" marginTop="s5">
        <Checkbox
          control={control}
          rules={{
            required: false,
          }}
          name="isSubscriptionChecked"
          onChange={handleSubscriptionChange}
        />
        <Text variant="text-xs" marginLeft="s5" style={styles.subscriptionText}>
          {strings.auth.subscriptionText}
        </Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  containerViewStyle: {
    padding: theme.spacing.s3,
  },
  firstNameInput: { flex: 1, marginRight: theme.spacing.s2 },
  lastNameInput: { flex: 1, marginLeft: theme.spacing.s2 },
  numberInput: { flex: 1 },
  subscriptionText: { flex: 1 },
});
