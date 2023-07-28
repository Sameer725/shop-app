import { useLazyQuery, useMutation } from '@apollo/client';
import { useConfirmPayment, useConfirmSetupIntent } from '@stripe/stripe-react-native';

import { useOrderState } from '@contexts';
import { CREATE_PAYMENT_INTENT, CREATE_SETUP_INTENT, GET_SAVED_PAYMENT_METHODS } from '@graphqlDocuments';
import { CreatePaymentIntentMutation, CreateSetupIntentMutation, OrderState, SavedPaymentMethods } from '@types';
import { usePaymentHooks } from './usePaymentHooks';
import { useToastNotification } from './useToastNotification';

export enum SetupIntentPaymentType {
  CARD = 'Card',
  SEPA = 'SepaDebit',
}

export interface SetupIntentCreateValues {
  name: string;
  iban?: string;
  email?: string;
}

export const useStripePayment = () => {
  const { showGeneralErrorToast } = useToastNotification();
  const { confirmSetupIntent } = useConfirmSetupIntent();
  const { confirmPayment } = useConfirmPayment();
  const { activeOrder } = useOrderState();
  const { transitionOrderToState } = usePaymentHooks();

  const [createSetupIntent] = useMutation<CreateSetupIntentMutation>(CREATE_SETUP_INTENT);
  const [createPaymentIntent] = useMutation<CreatePaymentIntentMutation>(CREATE_PAYMENT_INTENT);

  const [loadCardData] = useLazyQuery<SavedPaymentMethods.Query, SavedPaymentMethods.Variables>(
    GET_SAVED_PAYMENT_METHODS,
    { fetchPolicy: 'no-cache' }
  );

  const handleSetupIntent = async (type: SetupIntentPaymentType, values: SetupIntentCreateValues): Promise<string> => {
    const { data } = await createSetupIntent();

    // Prepare data to create a setup intent either for credit card or sepa
    let createParams;
    switch (type) {
      case SetupIntentPaymentType.CARD:
        createParams = {
          paymentMethodType: type,
          paymentMethodData: {
            billingDetails: {
              name: values.name,
            },
          },
        };
        break;
      case SetupIntentPaymentType.SEPA:
        if (!values.iban || !values.email) {
          return '';
        }

        createParams = {
          paymentMethodType: type,
          paymentMethodData: {
            iban: values.iban,
            billingDetails: {
              name: values.name,
              email: values.email,
            },
          },
        };
        break;
    }

    const confirmSetupIntentResult = await confirmSetupIntent(
      data?.createSetupIntent?.clientSecret ?? '',
      createParams
    );

    const paymentMethodId = confirmSetupIntentResult?.setupIntent?.paymentMethodId;

    if (confirmSetupIntentResult.error || !paymentMethodId) {
      showGeneralErrorToast();
      return '';
    } else {
      void loadCardData();
    }
    return paymentMethodId;
  };

  const handlePaymentIntent = async (paymentMethodId: string) => {
    if (activeOrder?.state !== OrderState.ARRANGING_PAYMENT) {
      const { data: transitionData } = await transitionOrderToState({
        state: OrderState.ARRANGING_PAYMENT,
      });
      if (transitionData?.transitionOrderToState?.__typename === 'OrderStateTransitionError') {
        throw new Error(transitionData.transitionOrderToState.transitionError);
      }
    }

    // Next create payment intent and confirm it using the newly saved payment method
    const { data: paymentIntent } = await createPaymentIntent();

    const confirmPaymentResult = await confirmPayment(paymentIntent?.createStripePaymentIntent ?? '', {
      paymentMethodType: 'Card',
      paymentMethodData: {
        paymentMethodId,
      },
    });

    if (confirmPaymentResult.error) {
      throw new Error();
    }
  };

  return { handleSetupIntent, handlePaymentIntent };
};
