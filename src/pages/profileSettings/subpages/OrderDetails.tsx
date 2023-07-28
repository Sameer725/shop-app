import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import { ScrollView } from 'react-native';

import { Box, Button, ButtonType, OrderCostOverview, OrderHistorySkeleton } from '@components';
import { useLocalizedData } from '@contexts';
import { GET_SINGLE_ORDER } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { ProfileSettingsScreens } from '@routes/routes';
import { GetSingleOrder, KsNavigation, KsRoute, Order } from '@types';
import { DeliveryDetails } from './components/DeliveryDetails';
import { DeliveryStatus } from './components/DeliveryStatus';
import { DownloadInvoice } from './components/DownloadInvoice';
import { OrderedProducts } from './components/OrderedProducts';
import { ALLOWED_DAYS_TO_COMPLAIN } from './OrderList';

export const OrderDetailsScreen: React.FC = () => {
  const route = useRoute<KsRoute<{ orderId: string }>>();
  const orderId: string = route?.params?.orderId ?? '';
  const navigation: KsNavigation = useNavigation();

  const { showGeneralErrorToast } = useToastNotification();

  const { data, loading: isLoading } = useQuery<GetSingleOrder.Query, GetSingleOrder.Variables>(GET_SINGLE_ORDER, {
    variables: { id: orderId },
    notifyOnNetworkStatusChange: true,
    onError: () => {
      navigation.goBack();
      showGeneralErrorToast();
    },
  });

  const maxAllowedDate = dayjs().subtract(ALLOWED_DAYS_TO_COMPLAIN, 'day').startOf('day');
  const isWithinAllowedDays = dayjs(data?.order?.orderPlacedAt as string).isAfter(maxAllowedDate);

  const goToComplain = () => {
    navigation.navigate(ProfileSettingsScreens.COMPLAINT_SCREEN, { orderId });
  };

  const { strings } = useLocalizedData();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <OrderHistorySkeleton />
      ) : (
        <Box flex={1} paddingTop="s5" paddingBottom="s8" paddingHorizontal="s3">
          <DeliveryStatus order={data?.order as Order} />

          <DeliveryDetails order={data?.order as Order} />

          <OrderedProducts order={data?.order as Order} />

          <Box marginTop="s5">
            <OrderCostOverview order={data?.order as Order} />
          </Box>

          {isWithinAllowedDays ? (
            <Button marginTop="s5" onPress={goToComplain} type={ButtonType.PRIMARY}>
              {strings.profileSettings.complain.submitComplaint}
            </Button>
          ) : null}

          <DownloadInvoice orderCode={(data?.order as Order)?.code} />
        </Box>
      )}
    </ScrollView>
  );
};
