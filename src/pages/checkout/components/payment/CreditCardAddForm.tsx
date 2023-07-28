import { CardField } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { BottomSheetHeader, Box, Button, OutlinedInput } from '@components';
import { useLocalizedData } from '@contexts';
import { SetupIntentPaymentType, usePaymentHooks, useStripePayment } from '@hooks';
import { BottomSheetWallet } from './BottomSheetWallet';

export const CreditCardAddForm: React.FC = () => {
  const { strings } = useLocalizedData();
  const { handleSetupIntent, handlePaymentIntent } = useStripePayment();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues = {
    name: '',
  };

  const { onSuccess, onError, formattedTotalWithTax } = usePaymentHooks();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues,
  });

  const saveAndPay = async () => {
    setIsLoading(true);
    try {
      const paymentMethodId = await handleSetupIntent(SetupIntentPaymentType.CARD, { name: getValues('name') });

      if (!paymentMethodId) {
        throw new Error();
      }

      // Next create payment intent and confirm it using the newly saved payment method
      await handlePaymentIntent(paymentMethodId);

      onSuccess();
    } catch (error) {
      setIsLoading(false);
      onError((error as Error).message);
    }
  };

  return (
    <Box marginBottom="s8" marginHorizontal="s3">
      <BottomSheetHeader title={strings.checkout.paymentMethods.card} />

      <BottomSheetWallet>
        <Box marginTop="s5">
          <OutlinedInput
            isEmail
            error={errors?.name ? strings.checkout.fullNameValidation : null}
            control={control}
            rules={{
              required: true,
            }}
            name="name"
            label={strings.checkout.cardName}
            returnKeyType="done"
            style={styles.name}
          />
          <CardField
            placeholders={{
              // eslint-disable-next-line id-blacklist
              number: strings.checkout.cardNumber,
              cvc: strings.checkout.cvc,
              expiration: strings.checkout.expiryDatePlaceholder,
            }}
            postalCodeEnabled={false}
            style={{ width: 'auto', height: 48 }}
            cardStyle={styles.card}
          />

          <Button
            onPress={handleSubmit(saveAndPay)}
            marginTop="s5"
            isLoading={isLoading}
            leadingIcon={<KsIcon name={KS_ICON.LOCK2} bold={true} color="white" size={18} />}
          >
            {strings.checkout.payAmount.replace(':totalWithTax', formattedTotalWithTax ?? '')}
          </Button>
        </Box>
      </BottomSheetWallet>
    </Box>
  );
};

const styles = StyleSheet.create({
  name: { marginBottom: theme.spacing.s8 },
  card: {
    borderColor: theme.colors.gray500,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    placeholderColor: theme.colors.textColorPlaceholder,
    textColor: theme.colors.defaultTextColor,
    fontSize: 14,
    lineHeight: 14 * 1.5,
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
  },
});
