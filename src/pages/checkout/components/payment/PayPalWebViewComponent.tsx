import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import WebView, { WebViewNavigation } from 'react-native-webview';

import theme from '@assets/theme/theme';
import { Box } from '@components';
import { CREATE_PAYPAL_PAYMENT } from '@graphqlDocuments';
import { usePaymentHooks, useToastNotification } from '@hooks';
import { BasketScreens } from '@routes/routes';
import { CreatePaypalPaymentMutation, KsNavigation } from '@types';

export const PayPalWebViewComponent: React.FC = () => {
  const navigation: KsNavigation = useNavigation();
  const { onSuccess } = usePaymentHooks();
  const { showGeneralErrorToast } = useToastNotification();

  const [paypalLink, setPaypalLink] = useState<string>();

  const [createPaypalPayment] = useMutation<CreatePaypalPaymentMutation>(CREATE_PAYPAL_PAYMENT);

  useEffect(() => {
    createPaypalPayment()
      .then((result) => {
        const link = result.data?.createPaypalPayment;
        if (link) {
          setPaypalLink(link);
        } else {
          showGeneralErrorToast();
        }
      })
      .catch(() => showGeneralErrorToast());
  }, []);

  const onNavigationStateChange = (data: WebViewNavigation) => {
    if (data.url.includes('success')) {
      onSuccess();
    } else if (data.url.includes('cancel')) {
      navigation.navigate(BasketScreens.CHECKOUT);
      showGeneralErrorToast();
    } else {
      return;
    }
  };
  return (
    <>
      {paypalLink ? (
        <WebView source={{ uri: paypalLink }} onNavigationStateChange={onNavigationStateChange} />
      ) : (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size={theme.spacing.s10} color={theme.colors.defaultTextColor} />
        </Box>
      )}
    </>
  );
};
