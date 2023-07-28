import { useApolloClient } from '@apollo/client';
import React, { useCallback, useContext, useMemo } from 'react';

import {
  ADD_ITEM_TO_ORDER,
  ADD_ITEMS_TO_ORDER,
  ADJUST_ORDER_LINE,
  ADJUST_ORDER_LINES,
  ADJUST_PRODUCT_VARIANT_IN_ORDER,
  REMOVE_ALL_ORDER_LINES,
  REMOVE_ITEM_FROM_ORDER,
} from '@graphqlDocuments';
import { SetAsyncState } from '@hooks';
import {
  AddItemsToOrder,
  AddItemsToOrderInput,
  AddItemToOrder,
  AddItemToOrderMutationVariables,
  AdjustOrderLine,
  AdjustOrderLineInput,
  AdjustOrderLineMutationVariables,
  AdjustOrderLines,
  AdjustProductVariantInOrder,
  AdjustProductVariantInOrderMutationVariables,
  Order,
  RemoveAllOrderLinesMutation,
  RemoveItemFromOrder,
  RemoveItemFromOrderMutationVariables,
  UpdateOrderItemsResult,
} from '@types';
import { Line, mapOrderLines } from './common';

export enum MessageStatus {
  SUCCESS = 'success',
  OUT_OF_STOCK_ERROR = 'outOfStockError',
  IDLE = 'idle',
  ERROR = 'error',
}

interface OrderActionProps {
  setActiveOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  refetchOrder: () => void;
  setOrderLines: SetAsyncState<Record<string, Line>>;
  setEarliestDeliveryTime: SetAsyncState<Date | undefined>;
  setRunningOrderMutationIds: React.Dispatch<React.SetStateAction<string[]>>;
}

interface OrderActionContext extends OrderActionProps {
  onAdd: (props: AddItemToOrderMutationVariables) => Promise<{ data: Order | null; message: MessageStatus }>;
  onAddItems: (props: AddItemsToOrderInput[]) => Promise<MessageStatus>;
  onRemoveItems: () => Promise<MessageStatus>;
  onAdjustOrderItem: (
    props: AdjustOrderLineMutationVariables
  ) => Promise<{ data: Order | null; message: MessageStatus }>;
  onAdjustProductVariantInOrder: (
    props: AdjustProductVariantInOrderMutationVariables
  ) => Promise<{ data: Order | null; message: MessageStatus }>;
  onAdjustOrderItems: (
    props: AdjustOrderLineMutationVariables[]
  ) => Promise<{ data: Order | null; message: MessageStatus }>;
  onRemove: (props: RemoveItemFromOrderMutationVariables) => Promise<{ data: Order | null; message: MessageStatus }>;
}

const OrderActionContext = React.createContext<OrderActionContext | null>(null);

const getOnAddStatusMessage = (orderItem: UpdateOrderItemsResult | null) => {
  if (!orderItem) {
    return MessageStatus.SUCCESS;
  }

  switch (orderItem?.__typename) {
    case 'Order':
      return MessageStatus.SUCCESS;
    case 'InsufficientStockError':
      return MessageStatus.OUT_OF_STOCK_ERROR;
    default:
      return MessageStatus.IDLE;
  }
};

export const OrderActionProvider: React.FC<OrderActionProps> = (props) => {
  const { children, setActiveOrder, refetchOrder, setOrderLines, setEarliestDeliveryTime, setRunningOrderMutationIds } =
    props;
  const client = useApolloClient();

  const updateOrder = useCallback((order: Order) => {
    const { lines, customFields, ...rest } = order;
    void setOrderLines(mapOrderLines(lines ?? []));
    setActiveOrder((prevOrder) => {
      if (!prevOrder || !order) {
        return prevOrder;
      }

      const updatedOrderCustomFields = { ...prevOrder.customFields, ...customFields };
      return { ...prevOrder, ...rest, customFields: updatedOrderCustomFields };
    });

    void setEarliestDeliveryTime(order.customFields?.earliestDeliveryTime as Date);
  }, []);

  const getStatusAndSetActiveOrder = useCallback((addItemToOrder: Order) => {
    const message = getOnAddStatusMessage(addItemToOrder);

    return { data: addItemToOrder, message };
  }, []);

  const onAdd = useCallback(
    async (variables: AddItemToOrderMutationVariables) => {
      try {
        const { data } = await client.mutate<AddItemToOrder.Mutation, AddItemToOrder.Variables>({
          mutation: ADD_ITEM_TO_ORDER,
          variables,
        });

        return getStatusAndSetActiveOrder(data?.addItemToOrder as Order);
      } catch (err) {
        return { data: null, message: MessageStatus.ERROR };
      }
    },
    [getStatusAndSetActiveOrder]
  );

  const onAddItems = useCallback(async (items: AddItemsToOrderInput[]) => {
    const { data } = await client.mutate<AddItemsToOrder.Mutation, AddItemsToOrder.Variables>({
      mutation: ADD_ITEMS_TO_ORDER,
      variables: { items },
    });

    const message = getOnAddStatusMessage(data?.addItemsToOrder as Order);

    if (data?.addItemsToOrder.__typename === 'Order') {
      updateOrder(data?.addItemsToOrder as Order);
    }

    return message;
  }, []);

  const onRemoveItems = useCallback(async () => {
    const { data } = await client.mutate<RemoveAllOrderLinesMutation>({
      mutation: REMOVE_ALL_ORDER_LINES,
    });
    const message = getOnAddStatusMessage(data?.removeAllOrderLines as Order);
    if (data?.removeAllOrderLines.__typename === 'Order') {
      updateOrder(data?.removeAllOrderLines as Order);
    }

    return message;
  }, []);

  const onAdjustOrderItem = useCallback(
    async (input: AdjustOrderLineInput) => {
      const { orderLineId, quantity } = input;
      const { data } = await client.mutate<AdjustOrderLine.Mutation, AdjustOrderLine.Variables>({
        mutation: ADJUST_ORDER_LINE,
        variables: { orderLineId, quantity },
      });

      return getStatusAndSetActiveOrder(data?.adjustOrderLine as Order);
    },
    [getStatusAndSetActiveOrder]
  );

  const onAdjustOrderItems = useCallback(
    async (items: AdjustOrderLineInput[]) => {
      const { data } = await client.mutate<AdjustOrderLines.Mutation, AdjustOrderLines.Variables>({
        mutation: ADJUST_ORDER_LINES,
        variables: { items },
      });

      return getStatusAndSetActiveOrder(data?.adjustOrderLines as Order);
    },
    [getStatusAndSetActiveOrder]
  );

  const onAdjustProductVariantInOrder = useCallback(
    async (variables: AdjustProductVariantInOrderMutationVariables) => {
      const { data } = await client.mutate<AdjustProductVariantInOrder.Mutation, AdjustProductVariantInOrder.Variables>(
        {
          mutation: ADJUST_PRODUCT_VARIANT_IN_ORDER,
          variables,
        }
      );

      return getStatusAndSetActiveOrder(data?.adjustProductVariantInOrder as Order);
    },
    [getStatusAndSetActiveOrder]
  );

  const onRemove = useCallback(
    async (variables: RemoveItemFromOrderMutationVariables) => {
      try {
        const { data } = await client.mutate<RemoveItemFromOrder.Mutation, RemoveItemFromOrder.Variables>({
          mutation: REMOVE_ITEM_FROM_ORDER,
          variables,
        });

        return getStatusAndSetActiveOrder(data?.removeItemFromOrder as Order);
      } catch (err) {
        return { data: null, message: MessageStatus.ERROR };
      }
    },
    [getStatusAndSetActiveOrder]
  );

  const actions = useMemo(
    () => ({
      onAdd,
      onAddItems,
      onRemoveItems,
      onAdjustOrderItem,
      onAdjustOrderItems,
      onAdjustProductVariantInOrder,
      onRemove,
      setActiveOrder,
      refetchOrder,
      setOrderLines,
      setEarliestDeliveryTime,
      setRunningOrderMutationIds,
    }),
    [refetchOrder]
  );

  return <OrderActionContext.Provider value={actions}>{children}</OrderActionContext.Provider>;
};

export const useOrderAction = () => {
  const context = useContext(OrderActionContext);

  if (!context) {
    throw new Error('use useOrderAction hook insider OrderContextProvider');
  }

  return context;
};
