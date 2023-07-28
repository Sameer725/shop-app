import { useRoute } from '@react-navigation/native';
import React from 'react';

import { createBottomSheetNavigator } from '@components';
import {
  ApplePay,
  CreditCardAddForm,
  CreditCardSelection,
  GooglePay,
  InvoicePayment,
  PaymentBottomSheet,
  PayPalButton,
  SepaCardSelection,
  SepaForm,
} from '@pages';
import { KsRoute } from '@types';
import { PaymentScreens } from './routes';

export const PaymentNavigation = () => {
  const PaymentBottomSheetNavigator = createBottomSheetNavigator();

  const route = useRoute<KsRoute<{ addToWallet: string }>>();

  return (
    <PaymentBottomSheetNavigator.Navigator>
      <PaymentBottomSheetNavigator.Screen
        name={PaymentScreens.PAYMENT_OPTIONS}
        component={PaymentBottomSheet}
        initialParams={route.params}
      />
      <PaymentBottomSheetNavigator.Screen name={PaymentScreens.APPLE_PAY} component={ApplePay} />
      <PaymentBottomSheetNavigator.Screen
        name={PaymentScreens.CREDIT_CARD_SELECTION_SCREEN}
        component={CreditCardSelection}
      />
      <PaymentBottomSheetNavigator.Screen
        name={PaymentScreens.CREDIT_CARD_CARD_NEW_SCREEN}
        component={CreditCardAddForm}
      />
      <PaymentBottomSheetNavigator.Screen name={PaymentScreens.GOOGLE_PAY} component={GooglePay} />
      <PaymentBottomSheetNavigator.Screen name={PaymentScreens.INVOICE} component={InvoicePayment} />
      <PaymentBottomSheetNavigator.Screen name={PaymentScreens.PAYPAL} component={PayPalButton} />
      <PaymentBottomSheetNavigator.Screen
        name={PaymentScreens.SEPA_PAY_SELECTION_SCREEN}
        component={SepaCardSelection}
      />
      <PaymentBottomSheetNavigator.Screen name={PaymentScreens.SEPA_PAY_NEW_SCREEN} component={SepaForm} />
    </PaymentBottomSheetNavigator.Navigator>
  );
};
