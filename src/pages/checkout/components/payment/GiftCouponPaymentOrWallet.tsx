import { useMutation } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';

import { Box, Button, Text } from '@components';
import { PaymentMethodTypes } from '@constants';
import { useLocalizedData, useOrderState } from '@contexts';
import { ADD_GIFT_COUPON_TO_WALLET, ADD_PAYMENT_TO_ORDER } from '@graphqlDocuments';
import { usePaymentHooks, useToastNotification } from '@hooks';
import {
  AddGiftCouponToWalletMutation,
  AddGiftCouponToWalletMutationVariables,
  AddPaymentToOrderMutation,
  AddPaymentToOrderMutationVariables,
  KsRoute,
  OrderState,
} from '@types';

interface GiftCouponPaymentOrWalletProps {
  fromWallet?: boolean;
  walletLoading?: boolean;
}

export const GiftCouponPaymentOrWallet: React.FC<GiftCouponPaymentOrWalletProps> = (props) => {
  const { fromWallet, walletLoading = false } = props;
  const { strings } = useLocalizedData();
  const { activeOrder } = useOrderState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addGiftCouponPaymentOrWalletToOrder] = useMutation<
    AddPaymentToOrderMutation,
    AddPaymentToOrderMutationVariables
  >(ADD_PAYMENT_TO_ORDER, {
    variables: { method: fromWallet ? PaymentMethodTypes.WALLET : PaymentMethodTypes.GIFT_COUPON },
  });

  const { onSuccess, onError, transitionOrderToState } = usePaymentHooks();

  const { showGeneralErrorToast } = useToastNotification();

  const [addGiftCoupon] = useMutation<AddGiftCouponToWalletMutation, AddGiftCouponToWalletMutationVariables>(
    ADD_GIFT_COUPON_TO_WALLET
  );
  const route = useRoute<KsRoute<{ addToWallet: string }>>();

  const pay = async () => {
    setIsLoading(true);
    try {
      if (activeOrder?.state !== OrderState.ARRANGING_PAYMENT) {
        const { data: transitionData } = await transitionOrderToState({ state: OrderState.ARRANGING_PAYMENT });
        if (transitionData?.transitionOrderToState?.__typename === 'OrderStateTransitionError') {
          setIsLoading(false);
          onError(transitionData.transitionOrderToState.message);
          return;
        }
      }

      const { data } = await addGiftCouponPaymentOrWalletToOrder();
      if (data?.addPaymentToOrder.__typename !== 'Order') {
        setIsLoading(false);
        showGeneralErrorToast();
        return;
      }

      if (route.params.addToWallet) {
        void addGiftCoupon({
          variables: { code: route.params.addToWallet },
        });
      }

      onSuccess();
    } catch (err) {
      setIsLoading(false);
      showGeneralErrorToast();
    }
  };

  return (
    <Box marginTop="s5">
      <Text marginBottom="s5">
        {fromWallet ? strings.checkout.payWithWalletInfo : strings.checkout.payWithGiftCouponInfo}
      </Text>

      <Button isLoading={isLoading || walletLoading} onPress={pay} marginBottom={fromWallet ? undefined : 's8'}>
        {fromWallet ? strings.checkout.payWithWallet : strings.checkout.payWithGiftCoupon}
      </Button>
    </Box>
  );
};
