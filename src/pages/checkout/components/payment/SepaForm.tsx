import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { BottomSheetHeader, Box, Button, OutlinedInput } from '@components';
import { EMAIL_REGEX, IBAN_REGEX } from '@constants';
import { useLocalizedData } from '@contexts';
import { SetupIntentPaymentType, usePaymentHooks, useStripePayment } from '@hooks';
import { BottomSheetWallet } from './BottomSheetWallet';

export const SepaForm: React.FC = () => {
  const { strings } = useLocalizedData();
  const { handleSetupIntent, handlePaymentIntent } = useStripePayment();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onSuccess, onError, formattedTotalWithTax } = usePaymentHooks();

  const defaultValues = {
    name: '',
    email: '',
    iban: '',
  };

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
      const paymentMethodId = await handleSetupIntent(SetupIntentPaymentType.SEPA, {
        email: getValues('email'),
        iban: getValues('iban'),
        name: getValues('name'),
      });

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

  const emailInput = useRef<TextInput>(null);
  const ibanInput = useRef<TextInput>(null);

  return (
    <Box marginBottom="s8" marginHorizontal="s3">
      <BottomSheetHeader title={strings.checkout.paymentMethods.sepa} />
      <BottomSheetWallet>
        <Box marginTop="s5">
          <OutlinedInput
            error={errors?.name ? strings.checkout.fullNameValidation : null}
            control={control}
            rules={{
              required: true,
            }}
            name="name"
            label={strings.checkout.fullName}
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInput.current?.focus();
            }}
            style={{ marginBottom: theme.spacing.s8 }}
          />

          <OutlinedInput
            inputRef={emailInput}
            isEmail
            error={errors?.email ? strings.checkout.emailValidation : null}
            control={control}
            rules={{
              required: true,
              pattern: EMAIL_REGEX,
            }}
            name="email"
            label={strings.checkout.email}
            returnKeyType="next"
            onSubmitEditing={() => {
              ibanInput.current?.focus();
            }}
            style={{ marginBottom: theme.spacing.s8 }}
          />
          <OutlinedInput
            inputRef={ibanInput}
            isEmail
            error={errors?.iban ? strings.checkout.ibanValidation : null}
            control={control}
            rules={{
              required: true,
              pattern: IBAN_REGEX,
            }}
            name="iban"
            label={strings.checkout.iban}
            placeholder={strings.checkout.ibanPlaceholder}
            returnKeyType="done"
            style={{ marginBottom: theme.spacing.s5 }}
          />

          <Button
            onPress={handleSubmit(saveAndPay)}
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
