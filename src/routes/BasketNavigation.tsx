import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { NativeStackNavigationHelpers } from 'react-native-screens/lib/typescript/native-stack/types';

import { HeaderBackButton } from '@components';
import { useAuthData, useLocalizedData, useOrderLines } from '@contexts';
import { AddressSelectionScreen, BasketScreen, CheckoutScreen, DeliveryDateSelectionScreen } from '@pages';
import { BasketHeaderClearText } from '@pages/basket/components';
import { PayPalWebViewComponent } from '@pages/checkout/components/payment/PayPalWebViewComponent';
import { PaymentNavigation } from './PaymentNavigation';
import { BasketScreens } from './routes';
import { headerDefaultStyles } from './styles';

export const BasketNavigation: React.FC<BottomTabScreenProps<ParamListBase>> = ({ navigation: navigationProps }) => {
  const Stack = createStackNavigator();
  const { strings } = useLocalizedData();
  const { isEmpty } = useOrderLines();

  const { loginStatus } = useAuthData();

  useLayoutEffect(() => {
    navigationProps.setOptions({ tabBarStyle: { display: !isEmpty ? 'none' : 'flex' } });
  }, [navigationProps, isEmpty]);

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerDefaultStyles,
        title: strings.basket.shoppingCart,
        headerLeft: (props) => (
          <HeaderBackButton
            navigation={navigation as NativeStackNavigationHelpers}
            backButtonProps={{ ...props, canGoBack: (navigation as NativeStackNavigationHelpers).canGoBack() }}
          />
        ),
        headerRight: () => <BasketHeaderClearText />,
      })}
      initialRouteName={BasketScreens.BASKET}
    >
      <Stack.Screen
        name={BasketScreens.BASKET}
        component={BasketScreen}
        options={{
          headerShown: !!loginStatus.userDetail?.id,
        }}
      />

      <Stack.Screen
        name={BasketScreens.CHECKOUT}
        component={CheckoutScreen}
        options={{
          headerShown: true,
          headerRight: () => null,
          title: strings.checkout.checkout,
        }}
      />

      <Stack.Screen
        name={BasketScreens.PAYPAL_WEBVIEW}
        component={PayPalWebViewComponent}
        options={{
          headerShown: true,
          headerRight: () => null,
          title: strings.checkout.paymentMethods.payPal,
        }}
      />

      <Stack.Screen
        name={BasketScreens.ORDER_DELIVERY_DATE_SELECTION_SCREEN}
        component={DeliveryDateSelectionScreen}
        initialParams={{ isFromBasketNavigation: true }}
        options={{
          headerShown: true,
          headerRight: () => null,
          title: strings.deliveryDate.deliveryInstruction,
        }}
      />
      <Stack.Screen
        name={BasketScreens.ORDER_DELIVERY_ADDRESS_NEW}
        component={AddressSelectionScreen}
        options={{
          headerShown: true,
          headerRight: () => null,
          title: strings.profileSettings.addresses.newAddress,
        }}
      />
      <Stack.Screen
        name={BasketScreens.PAYMENT}
        component={PaymentNavigation}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          animationEnabled: false,
          cardOverlayEnabled: true,
          detachPreviousScreen: false,
        }}
      />
    </Stack.Navigator>
  );
};
