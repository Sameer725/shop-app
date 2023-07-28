import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ListRenderItem, Platform, StyleSheet, View } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { ActivityIndicator } from 'react-native-paper';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { GET_CUSTOMER_ORDERS } from '@graphqlDocuments';
import { OrderListItem } from '@pages/profileSettings/components/OrderListItem';
import { GetCustomerOrders, Order, OrderState, SortOrder } from '@types';

const ORDERS_CHUNK_SIZE = 20;
const LOAD_MORE_ORDERS_THRESHOLD = 10;
export const ALLOWED_DAYS_TO_COMPLAIN = 31;

export const DEFAULT_ORDER_LIST_FILTERS = {
  active: { eq: false },
  state: {
    in: [
      OrderState.ARRANGING_PAYMENT,
      OrderState.PAYMENT_AUTHORIZED,
      OrderState.PAYMENT_SETTLED,
      OrderState.SHIPPED,
      OrderState.PARTIALLY_SHIPPED,
      OrderState.DELIVERED,
      OrderState.PARTIALLY_DELIVERED,
      OrderState.MODIFYING,
      OrderState.ARRANGING_ADDITIONAL_PAYMENT,
      OrderState.CANCELLED,
    ],
  },
};

const ORDER_FILTERS_FOR_COMPLAIN = {
  ...DEFAULT_ORDER_LIST_FILTERS,
  orderPlacedAt: {
    after: dayjs().subtract(ALLOWED_DAYS_TO_COMPLAIN, 'day').startOf('day'),
  },
};

interface Props {
  fromComplaintModal?: boolean;
  onCloseModal?: () => void;
}

export const OrderListScreen: React.FC<Props> = (props) => {
  const { fromComplaintModal = false, onCloseModal } = props;

  const [isFirstBatchFetched, setIsFirstBatchFetched] = useState<boolean>(false);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const { strings } = useLocalizedData();

  const {
    data,
    fetchMore,
    loading: isLoading,
    variables,
  } = useQuery<GetCustomerOrders.Query, GetCustomerOrders.Variables>(GET_CUSTOMER_ORDERS, {
    variables: {
      options: {
        sort: { createdAt: SortOrder.Desc },
        filter: fromComplaintModal ? ORDER_FILTERS_FOR_COMPLAIN : DEFAULT_ORDER_LIST_FILTERS,
        take: ORDERS_CHUNK_SIZE,
      },
    },
    onCompleted: () => {
      setIsFirstBatchFetched(true);
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setOrders((data?.activeCustomer?.orders?.items as Order[]) ?? []);
  }, [data]);

  const renderItem: ListRenderItem<Order> = ({ item }) => (
    <OrderListItem
      order={item}
      showDetails={fromComplaintModal ? false : true}
      fromComplaintModal={fromComplaintModal}
      onCloseModal={onCloseModal}
    />
  );

  const loadMoreOrders = async () => {
    if (data?.activeCustomer?.orders.totalItems === orders.length) {
      setEndReached(true);
      return;
    }
    const { data: newData } = await fetchMore<GetCustomerOrders.Query, GetCustomerOrders.Variables>({
      variables: { options: { ...variables?.options, skip: orders.length } },
    });

    return setOrders([...orders, ...((newData?.activeCustomer?.orders?.items as Order[]) ?? [])]);
  };

  const renderLoader = () => (
    <Box flex={1} justifyContent="center" paddingTop="s3">
      <ActivityIndicator size={theme.spacing.s10} color={theme.colors.gray500} />
    </Box>
  );

  if (!isFirstBatchFetched) {
    return renderLoader();
  }

  const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimensions.getRealWindowHeight();

  return (
    <Box maxHeight={fromComplaintModal ? deviceHeight - 200 : undefined}>
      {fromComplaintModal ? (
        <Text variant="heading-sm" marginTop="s1" marginBottom="s8" textAlign="center">
          {orders.length === 0
            ? strings.profileSettings.complain.noOrderToComplain
            : strings.profileSettings.complain.complainModalTitle}
        </Text>
      ) : null}

      {orders.length === 0 && onCloseModal ? (
        <Button marginTop={'s5'} type={ButtonType.OUTLINE} onPress={onCloseModal}>
          {strings.cancel}
        </Button>
      ) : (
        <FlatList
          data={orders}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          keyExtractor={(order) => `order-list-item-${order.id}`}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListFooterComponent={isFirstBatchFetched && isLoading && !endReached ? renderLoader() : null}
          onEndReached={loadMoreOrders}
          onEndReachedThreshold={LOAD_MORE_ORDERS_THRESHOLD}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    height: theme.spacing.s5,
  },
  list: {
    paddingTop: theme.spacing.s5,
    paddingBottom: theme.spacing.s8,
    paddingHorizontal: theme.spacing.s3,
  },
});
