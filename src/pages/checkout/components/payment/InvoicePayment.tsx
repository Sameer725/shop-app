import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { BottomSheetHeader, Box, Button, Text } from '@components';
import { PaymentMethodTypes } from '@constants';
import { useLocalizedData, useOrderState } from '@contexts';
import { ADD_PAYMENT_TO_ORDER } from '@graphqlDocuments';
import { usePaymentHooks, useToastNotification } from '@hooks';
import { AddPaymentToOrderMutation, AddPaymentToOrderMutationVariables, OrderState } from '@types';
import { BottomSheetWallet } from './BottomSheetWallet';

export const InvoicePayment: React.FC = () => {
  const { strings } = useLocalizedData();
  const { activeOrder } = useOrderState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addInvoicePaymentToOrder] = useMutation<AddPaymentToOrderMutation, AddPaymentToOrderMutationVariables>(
    ADD_PAYMENT_TO_ORDER,
    { variables: { method: PaymentMethodTypes.INVOICE } }
  );

  const { onSuccess, onError, transitionOrderToState } = usePaymentHooks();

  const { showGeneralErrorToast } = useToastNotification();

  const payWithInvoice = async () => {
    setIsLoading(true);
    try {
      if (activeOrder?.state !== OrderState.ARRANGING_PAYMENT) {
        const { data: transitionData } = await transitionOrderToState({
          state: OrderState.ARRANGING_PAYMENT,
        });
        if (transitionData?.transitionOrderToState?.__typename === 'OrderStateTransitionError') {
          onError(transitionData?.transitionOrderToState.message);
          setIsLoading(false);
          return;
        }
      }

      const { data } = await addInvoicePaymentToOrder();
      if (data?.addPaymentToOrder.__typename !== 'Order') {
        setIsLoading(false);
        showGeneralErrorToast();
        return;
      }

      onSuccess();
    } catch (err) {
      setIsLoading(false);
      showGeneralErrorToast();
    }
  };

  return (
    <Box marginBottom="s8" marginHorizontal="s3">
      <BottomSheetHeader title={strings.checkout.paymentMethods.invoice} />
      <BottomSheetWallet>
        <Text marginVertical="s5">{strings.checkout.payWithInvoiceInfo}</Text>

        <Button isLoading={isLoading} onPress={payWithInvoice}>
          {strings.checkout.payWithInvoice}
        </Button>
      </BottomSheetWallet>
    </Box>
  );
};
