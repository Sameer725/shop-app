import { useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '@assets/theme/theme';
import { Box, Button } from '@components';
import { useLocalizedData, useOrderAction, useOrderState } from '@contexts';
import { GET_ORDER_SHIPPING_LINES } from '@graphqlDocuments';
import { BasketScreens, DashboardScreens } from '@routes/routes';
import { GetOrderShippingLinesQuery, KsNavigation, ShippingLine } from '@types';
import { DeliveryAddressSelection } from './components/DeliveryAddressSelection';
import { DeliveryDates } from './components/DeliveryDates';

interface RouteParams {
  isFromBasketNavigation?: boolean;
}

export const DeliveryDateSelectionScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const route: RouteProp<{ params: RouteParams }, 'params'> = useRoute();

  const insets = useSafeAreaInsets();
  const { activeOrder } = useOrderState();
  const { setActiveOrder } = useOrderAction();

  const { loading: isShippingLinesLoading } = useQuery<GetOrderShippingLinesQuery>(GET_ORDER_SHIPPING_LINES, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setActiveOrder((prevOrder) => {
        if (!prevOrder) {
          return prevOrder;
        }
        return { ...prevOrder, shippingLines: data.activeOrder?.shippingLines as ShippingLine[] };
      });
    },
  });

  useLayoutEffect(() => {
    const tabNav = navigation.getParent();

    tabNav?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      if (!route.params?.isFromBasketNavigation) {
        tabNav?.setOptions({ tabBarStyle: undefined });
      }
    };
  }, [navigation, route.params?.isFromBasketNavigation]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(
        route.params?.isFromBasketNavigation ? BasketScreens.CHECKOUT : DashboardScreens.DASHBOARD_LANDING_SCREEN
      );
    }
  };

  return (
    <Box flex={1} style={{ paddingBottom: insets.bottom }}>
      {!isShippingLinesLoading || activeOrder?.shippingLines ? (
        <>
          <DeliveryAddressSelection />
          <DeliveryDates />
        </>
      ) : (
        <Box justifyContent="center" flex={1}>
          <ActivityIndicator size={theme.spacing.s10} color={theme.colors.gray300} />
        </Box>
      )}

      <Button onPress={goBack} marginHorizontal="s3" marginBottom="s8">
        {strings.deliveryDate.confirmDeliveryInstruction}
      </Button>
    </Box>
  );
};
