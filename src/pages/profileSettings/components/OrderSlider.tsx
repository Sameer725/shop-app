import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import {
  Box,
  Button,
  ButtonSize,
  ButtonType,
  HorizontalSlider,
  HorizontalSliderRenderItemProps,
  Text,
} from '@components';
import { useLocalizedData } from '@contexts';
import { GET_CUSTOMER_ORDERS } from '@graphqlDocuments';
import { NoOrders } from '@pages/profileSettings/components/NoOrders';
import { OrderListItem } from '@pages/profileSettings/components/OrderListItem';
import { ProfileSettingsScreens } from '@routes/routes';
import { GetCustomerOrders, KsNavigation, Order, SortOrder } from '@types';
import { DEFAULT_ORDER_LIST_FILTERS } from '../subpages/OrderList';

const ITEM_OFFSET = theme.spacing.s12;
const MAX_ORDERS = 10;

export const OrderSlider: React.FC<unknown> = () => {
  const { data, loading: isLoading } = useQuery<GetCustomerOrders.Query, GetCustomerOrders.Variables>(
    GET_CUSTOMER_ORDERS,
    {
      variables: {
        options: {
          sort: { createdAt: SortOrder.Desc },
          filter: DEFAULT_ORDER_LIST_FILTERS,
          take: MAX_ORDERS,
        },
      },
    }
  );

  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();
  const [orders, setOrders] = useState<Order[]>([]);
  const itemWidth: number = Dimensions.get('window').width - 2 * ITEM_OFFSET;

  const renderItem = ({ width, item }: HorizontalSliderRenderItemProps<Order>) => (
    <Box flex={1} width={width} paddingHorizontal="s2">
      <OrderListItem order={item} />
    </Box>
  );

  useEffect(() => {
    const orderItems = data?.activeCustomer?.orders?.items as Order[];

    // Since the cached orders could be more than the maximum number of orders displayed, we need to splice the array
    setOrders((orderItems ?? []).slice(0, MAX_ORDERS));
  }, [data]);

  const navigateToOrderList = () => navigation.navigate(ProfileSettingsScreens.ORDER_LIST);

  return (
    <>
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginVertical="s6"
        marginHorizontal="s3"
        height={theme.spacing.s8}
      >
        <Text variant="heading-sm">{strings.profileSettings.order.yourOrders}</Text>
        {orders.length === 0 ? null : (
          <Button onPress={navigateToOrderList} type={ButtonType.OUTLINE} size={ButtonSize.SM} flexibleWidth={true}>
            <Text color="primary500">{strings.profileSettings.order.showAllOrders}</Text>
          </Button>
        )}
      </Box>

      {data?.activeCustomer?.orders?.items.length === 0 && !isLoading ? (
        <Box marginHorizontal="s3">
          <NoOrders />
        </Box>
      ) : (
        <HorizontalSlider
          itemWidth={itemWidth}
          skeletonHeight={107}
          data={orders}
          keyExtractor={(item) => `card-${item.id}`}
          indicatorKeyExtractor={(item) => `order-slider-${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          style={{ flex: 1 }}
          indicatorPosition="outside"
          isLoading={isLoading}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: ITEM_OFFSET,
    paddingBottom: theme.spacing.s2,
  },
});
