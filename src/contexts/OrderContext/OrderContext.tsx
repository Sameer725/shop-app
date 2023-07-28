import { useQuery } from '@apollo/client';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { GET_ACTIVE_ORDER } from '@graphqlDocuments';
import { useAsyncState } from '@hooks/useAsyncState';
import { GetActiveOrder, Order, OrderLine, ProductVariant } from '@types';
import { useAuthData } from '../AuthContext';
import { useUpdateTimerAndReFetchOrder } from '../TimerContext';
import { Line, mapOrderLines } from './common';
import { OrderActionProvider } from './OrderActionContext';

interface OrderContextType {
  activeOrder: Order | undefined;
  isLoading: boolean;
  runningOrderMutationIds: string[];
}

const OrderContext = React.createContext<OrderContextType | null>(null);

const OrderLinesContext = React.createContext<{
  lines: Record<string, Line>;
  isEmpty: boolean;
  getCount: (item: ProductVariant) => number;
  lineKeys: string[];
}>({ lines: {}, isEmpty: true, getCount: () => 0, lineKeys: [] });

const OrderDeliveryDateContext = React.createContext<{
  earliestDeliveryTime?: Date;
}>({ earliestDeliveryTime: undefined });

export const OrderContextProvider: React.FC = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState<Order>();
  const [skip, setSkip] = useState<boolean>(true);
  const [runningOrderMutationIds, setRunningOrderMutationIds] = useState<string[]>([]);
  const [orderLines, setOrderLines] = useAsyncState<Record<string, Line>>({});
  const [earliestDeliveryTime, setEarliestDeliveryTime] = useAsyncState<Date | undefined>(undefined);
  const { isRefetching, updateTimer } = useUpdateTimerAndReFetchOrder();
  const currentAppState = useRef(AppState.currentState);

  const { loginStatus } = useAuthData();

  const { loading: isLoading, refetch: refetchOrderQuery } = useQuery<GetActiveOrder.Query>(GET_ACTIVE_ORDER, {
    notifyOnNetworkStatusChange: true,
    skip,
    onCompleted: ({ activeOrder: activeOrderData }) => {
      if (activeOrderData) {
        const { lines, ...rest } = activeOrderData;
        void setOrderLines(mapOrderLines(lines as OrderLine[]));
        setActiveOrder((prevOrder) => {
          if (!prevOrder) {
            return rest as Order;
          }
          return { ...prevOrder, ...(rest as Order) };
        });

        updateTimer(activeOrderData.customFields?.orderByTimeDate as Date);
        void setEarliestDeliveryTime(activeOrderData.customFields?.earliestDeliveryTime as Date);
      }
    },
  });

  useEffect(() => {
    if (loginStatus.isLoggedIn) {
      void refetchOrder();
    }
    setSkip(!loginStatus.isLoggedIn || loginStatus.isGuestUser);
  }, [loginStatus]);

  useEffect(() => {
    if (isRefetching) {
      void refetchOrder();
    }
  }, [isRefetching]);

  const value = useMemo(
    () => ({
      activeOrder,
      isLoading,
      runningOrderMutationIds,
    }),
    [activeOrder, isLoading, runningOrderMutationIds]
  );

  const getCount = useCallback(
    (item: ProductVariant) => {
      return orderLines[item.id]?.quantity ?? 0;
    },
    [orderLines]
  );

  const refetchOrder = useCallback(() => {
    // Check skip even if included in useQuery since it is ignored if calling the refetch function
    if (skip) {
      return;
    }
    return void refetchOrderQuery();
  }, [skip, refetchOrderQuery]);

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active' && currentAppState.current === 'background') {
        void refetchOrder();
      }
      currentAppState.current = nextAppState;
    });
    return () => {
      appStateListener?.remove();
    };
  }, [refetchOrder]);

  const linesValue = useMemo(() => {
    const lineKeys = Object.keys(orderLines).filter((key) => orderLines[key].quantity > 0);
    return {
      lines: orderLines,
      lineKeys,
      isEmpty: lineKeys.length === 0 || activeOrder?.totalQuantity === 0,
      getCount,
    };
  }, [orderLines, getCount]);

  const earliestDeliveryTimeMemo = useMemo(() => {
    return { earliestDeliveryTime };
  }, [earliestDeliveryTime]);

  return (
    <OrderActionProvider
      setOrderLines={setOrderLines}
      setActiveOrder={setActiveOrder}
      refetchOrder={refetchOrder}
      setEarliestDeliveryTime={setEarliestDeliveryTime}
      setRunningOrderMutationIds={setRunningOrderMutationIds}
    >
      <OrderLinesContext.Provider value={linesValue}>
        <OrderDeliveryDateContext.Provider value={earliestDeliveryTimeMemo}>
          <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
        </OrderDeliveryDateContext.Provider>
      </OrderLinesContext.Provider>
    </OrderActionProvider>
  );
};

export const useOrderState = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('use useOrder hook insider OrderContextProvider');
  }

  return context;
};

export const useOrderLines = () => {
  return useContext(OrderLinesContext);
};

export const useDeliveryDate = () => {
  return useContext(OrderDeliveryDateContext);
};
