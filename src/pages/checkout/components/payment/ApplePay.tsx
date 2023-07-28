import { useMutation } from '@apollo/client';
import { ApplePayButton, confirmPlatformPayPayment, PlatformPay, useApplePay } from '@stripe/stripe-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { BottomSheetHeader, Box, Text } from '@components';
import { useLocalizedData, useOrderState } from '@contexts';
import { CREATE_PAYMENT_INTENT } from '@graphqlDocuments';
import { usePaymentHooks } from '@hooks';
import { CreatePaymentIntentMutation, OrderState } from '@types';
import { BottomSheetWallet } from './BottomSheetWallet';

const ApplePayOptions = {
  merchantCountryCode: 'DE',
  currencyCode: 'EUR',
};

export const ApplePay: React.FC = () => {
  const { strings } = useLocalizedData();
  const { activeOrder } = useOrderState();

  const { isApplePaySupported } = useApplePay();

  const { onSuccess, onError, transitionOrderToState, totalWithTax, usedWalletValue, formattedTotalWithTax } =
    usePaymentHooks();

  const [createPaymentIntent] = useMutation<CreatePaymentIntentMutation>(CREATE_PAYMENT_INTENT);

  const payNow = async () => {
    try {
      const { data: paymentIntent } = await createPaymentIntent();

      if (activeOrder?.state !== OrderState.ARRANGING_PAYMENT) {
        const { data: transitionData } = await transitionOrderToState({
          state: OrderState.ARRANGING_PAYMENT,
        });
        if (transitionData?.transitionOrderToState?.__typename === 'OrderStateTransitionError') {
          throw new Error(transitionData.transitionOrderToState.transitionError);
        }
      }

      const { error: confirmError } = await confirmPlatformPayPayment(paymentIntent?.createStripePaymentIntent ?? '', {
        applePay: {
          cartItems: [
            {
              paymentType: PlatformPay.PaymentType.Immediate,
              label: strings.checkout.payKleinStark,
              amount: totalWithTax ? String((totalWithTax - (usedWalletValue ?? 0)) / 100) : '0',
            },
          ],
          ...ApplePayOptions,
        },
      });

      if (confirmError) {
        // Ensure that the order status is reset to adding items
        await transitionOrderToState({
          state: OrderState.ADDING_ITEMS,
        });

        throw confirmError;
      }

      onSuccess();
    } catch (error) {
      onError((error as Error).message);
    }
  };

  return (
    <Box marginBottom="s8" marginHorizontal="s3">
      <BottomSheetHeader title={strings.checkout.paymentMethods.applePay} />
      <BottomSheetWallet>
        <Box marginTop="s5">
          {isApplePaySupported ? (
            <>
              <ApplePayButton onPress={payNow} style={styles.buttonStyles} />
              <Text marginTop="s3" variant="text-md" textAlign="center">
                {formattedTotalWithTax}
              </Text>
            </>
          ) : (
            <Text> {strings.checkout.applePayNotSupported}</Text>
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
