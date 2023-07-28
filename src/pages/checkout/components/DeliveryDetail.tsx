import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, DeliveryAddressSelectionModal, OutlinedInput, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { UPDATE_CUSTOMER } from '@graphqlDocuments';
import { useShakeAnimation, useToastNotification } from '@hooks';
import { BasketScreens } from '@routes/routes';
import { KsNavigation, UpdateCustomerMutationVariables } from '@types';
import { FormValue } from '../formHelper';
import { CheckoutCard } from './CheckoutCard';

export interface DeliveryAddressProps {
  address: string;
}

export const DeliveryAddress = (props: FormValue) => {
  const { formValue } = props;
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();
  const { ShakeContainer, startShakeAnimation } = useShakeAnimation();

  const [showAddressModal, setShowAddressModal] = useState(false);

  const {
    control,
    watch,
    formState: { errors },
  } = formValue;

  useLayoutEffect(() => {
    if (errors.address) {
      startShakeAnimation();
    }
  }, [errors.address]);

  useEffect(() => {
    formValue.clearErrors();
  }, [watch('address')]);

  const showModal = () => setShowAddressModal(true);
  const closeModal = () => setShowAddressModal(false);

  const onAddressPress = () => {
    if (watch('address') === '') {
      navigation.navigate(BasketScreens.ORDER_DELIVERY_ADDRESS_NEW);
    } else {
      showModal();
    }
  };

  return (
    <ShakeContainer>
      <DeliveryAddressSelectionModal
        closeModal={closeModal}
        showModal={showAddressModal}
        deliveryAddressNewRoute={BasketScreens.ORDER_DELIVERY_ADDRESS_NEW}
      />

      <Pressable onPress={onAddressPress}>
        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={() => (
            <Box
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              padding="s3"
              borderWidth={theme.borderWidth.b1}
              borderColor={errors.address ? 'error500' : 'gray500'}
              borderRadius={theme.radii.lg}
              marginTop="s5"
              minHeight={theme.spacing.s12}
            >
              <Text style={styles.text} variant="text-sm" lineBreakMode="middle" textBreakStrategy="balanced">
                {watch('address') === '' ? strings.checkout.deliveryDetail.createAddress : watch('address')}
              </Text>
              <KsIcon name={KS_ICON.ARROW_RIGHT_3} size={theme.spacing.s4} color={theme.colors.gray700} />
            </Box>
          )}
        ></Controller>
      </Pressable>
      {errors.address ? (
        <Box paddingHorizontal="s3" paddingTop="s1">
          <Text variant="text-xs" color="error500">
            {strings.checkout.deliveryDetail.addressError}
          </Text>
        </Box>
      ) : null}
    </ShakeContainer>
  );
};

interface DeliveryDetailProps extends FormValue {
  onUpdateShippingDetails: () => Promise<void>;
}

export const ReceiverDetails = (props: DeliveryDetailProps) => {
  const { formValue, onUpdateShippingDetails } = props;
  const { showGeneralErrorToast } = useToastNotification();
  const {
    control,
    formState: { errors },
  } = formValue;

  const { strings } = useLocalizedData();
  const { ShakeContainer, startShakeAnimation } = useShakeAnimation();

  const [updateCustomer] = useMutation<UpdateCustomerMutationVariables>(UPDATE_CUSTOMER, {
    onError: () => {
      showGeneralErrorToast();
    },
  });

  const updatePhoneNumber = () => {
    void updateCustomer({
      variables: {
        input: {
          phoneNumber: formValue.getValues().phoneNumber,
        },
      },
    });
    Keyboard.dismiss();
  };

  useLayoutEffect(() => {
    if (errors.fullName) {
      startShakeAnimation();
    }
  }, [errors.fullName]);

  return (
    <Box>
      <ShakeContainer>
        <OutlinedInput
          error={errors.fullName ? strings.checkout.deliveryDetail.firstNameError : null}
          control={control}
          name="fullName"
          label={strings.checkout.deliveryDetail.customerFullName}
          returnKeyType="done"
          rules={{ required: true }}
          autoCapitalize="words"
          autoComplete="name"
          onBlur={onUpdateShippingDetails}
        />
      </ShakeContainer>
      <OutlinedInput
        style={styles.phoneInput}
        control={control}
        name="phoneNumber"
        label={strings.checkout.deliveryDetail.phoneNumber}
        returnKeyType="done"
        error={null}
        keyboardType="number-pad"
        onBlur={updatePhoneNumber}
      />
    </Box>
  );
};

export const DeliveryDetail = (props: DeliveryDetailProps) => {
  const { formValue, onUpdateShippingDetails } = props;

  const {
    strings: { checkout },
  } = useLocalizedData();

  return (
    <CheckoutCard title={checkout.deliveryDetail.name}>
      <ReceiverDetails onUpdateShippingDetails={onUpdateShippingDetails} formValue={formValue} />
      <DeliveryAddress formValue={formValue} />
    </CheckoutCard>
  );
};

const styles = StyleSheet.create({
  phoneInput: { marginTop: theme.spacing.s4 },
  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
