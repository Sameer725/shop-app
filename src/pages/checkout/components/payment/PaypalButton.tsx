import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import PayPalLogo from '@assets/paymentLogos/payPalLogo.svg';
import theme from '@assets/theme/theme';
import { BottomSheetHeader, Box, Text } from '@components';
import { useLocalizedData, useOrderState } from '@contexts';
import { usePaymentHooks } from '@hooks';
import { BasketScreens } from '@routes/routes';
import { KsNavigation, OrderState } from '@types';
import { BottomSheetWallet } from './BottomSheetWallet';

export const PayPalButton: React.FC = () => {
  const { onError, transitionOrderToState, formattedTotalWithTax } = usePaymentHooks();

  const { activeOrder } = useOrderState();

  const { strings } = useLocalizedData();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation: KsNavigation = useNavigation();

  const handleSubmitPaypalPayment = async () => {
    setIsLoading(true);

    try {
      // In case that the order is not in the "ArrangingPayment" state yet, set the state accordingly so the payment can be added
      if (activeOrder?.state !== OrderState.ARRANGING_PAYMENT) {
        const { data: transitionData } = await transitionOrderToState({ state: OrderState.ARRANGING_PAYMENT });

        if (transitionData?.transitionOrderToState?.__typename === 'OrderStateTransitionError') {
          throw new Error(transitionData.transitionOrderToState.transitionError);
        }
      }

      navigation.navigate(BasketScreens.PAYPAL_WEBVIEW);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      onError((error as Error).message);
    }
  };

  return (
    <Box marginBottom="s8" marginHorizontal="s3">
      <BottomSheetHeader title={strings.checkout.paymentMethods.payPal} />
      <BottomSheetWallet>
        <Pressable onPress={handleSubmitPaypalPayment} disabled={isLoading}>
          <Box
            marginTop="s5"
            borderRadius={theme.radii.md}
            borderWidth={1}
            borderColor="gray200"
            padding="s3"
            alignItems="center"
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.defaultTextColor} size={20} />
            ) : (
              <PayPalLogo width={100} height={20} />
            )}
          </Box>
        </Pressable>

        <Text marginTop="s3" variant="text-md" textAlign="center">
          {formattedTotalWithTax}
        </Text>
      </BottomSheetWallet>
    </Box>
  );
};
