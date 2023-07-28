import { useMutation } from '@apollo/client';
import { confirmPlatformPayPayment, GooglePayButton, PlatformPay, useGooglePay } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { BottomSheetHeader, Box, Text } from '@components';
import { useLocalizedData, useOrderState } from '@contexts';
import { PRODUCTION } from '@env';
import { CREATE_PAYMENT_INTENT } from '@graphqlDocuments';
import { usePaymentHooks } from '@hooks';
import { CreatePaymentIntentMutation, OrderState } from '@types';
import { BottomSheetWallet } from './BottomSheetWallet';

const GooglePayOptions: PlatformPay.GooglePayBaseParams = {
  merchantName: 'Kleinstark',
  existingPaymentMethodRequired: false,
  isEmailRequired: false,
  testEnv: PRODUCTION === 'false',
  merchantCountryCode: 'DE',
  currencyCode: 'EUR',
};

export const GooglePay: React.FC = () => {
  const { onSuccess, onError, transitionOrderToState, formattedTotalWithTax } = usePaymentHooks();

  const { strings } = useLocalizedData();
  const { activeOrder } = useOrderState();
  const { isGooglePaySupported } = useGooglePay();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [createPaymentIntent] = useMutation<CreatePaymentIntentMutation>(CREATE_PAYMENT_INTENT);

  const [isGooglePaySupportedBool, setIsGooglePaySupportedBool] = useState<boolean>(false);

  useEffect(
    () =>
      void isGooglePaySupported({ testEnv: true }).then((isSupported) => {
        setIsGooglePaySupportedBool(isSupported);
      }),
    []
  );

  const payNow = async () => {
    setIsLoading(true);
    try {
      const { data: paymentIntent } = await createPaymentIntent();

      if (!paymentIntent?.createStripePaymentIntent) {
        throw new Error();
      }

      if (activeOrder?.state !== OrderState.ARRANGING_PAYMENT) {
        const { data: transitionData } = await transitionOrderToState({ state: OrderState.ARRANGING_PAYMENT });
        if (transitionData?.transitionOrderToState?.__typename === 'OrderStateTransitionError') {
          throw new Error(transitionData.transitionOrderToState.transitionError);
        }
      }

      const { error } = await confirmPlatformPayPayment(paymentIntent?.createStripePaymentIntent ?? '', {
        googlePay: GooglePayOptions,
      });

      if (error) {
        // Ensure that the order status is reset to adding items
        await transitionOrderToState({
          state: OrderState.ADDING_ITEMS,
        });

        if (error.code === 'Canceled') {
          setIsLoading(false);
          return;
        }

        throw error;
      }
      setIsLoading(false);

      onSuccess();
    } catch (error) {
      setIsLoading(false);
      onError((error as Error).message);
    }
  };

  return (
    <Box marginBottom="s8" marginHorizontal="s3">
      <BottomSheetHeader title={strings.checkout.paymentMethods.googlePay} />
      <BottomSheetWallet>
        <Box marginTop="s5">
          {isGooglePaySupportedBool ? (
            <>
              <GooglePayButton onPress={payNow} style={styles.buttonStyles} disabled={isLoading} />
              <Text marginTop="s3" variant="text-md" textAlign="center">
                {formattedTotalWithTax}
              </Text>
            </>
          ) : (
            <Text> {strings.checkout.googlePayNotSupported}</Text>
          )}
        </Box>
      </BottomSheetWallet>
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    height: theme.spacing.s12,
    borderRadius: theme.radii.md,
  },
});
