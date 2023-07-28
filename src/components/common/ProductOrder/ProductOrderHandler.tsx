import { debounce } from 'lodash';
import { useCallback, useMemo } from 'react';

import { useGuard, useOrderAction } from '@contexts';
import { MessageStatus } from '@contexts/OrderContext';
import { Line } from '@contexts/OrderContext/common';
import { SetAsyncState } from '@hooks';
import { Order, ProductVariant } from '@types';

const updateItem = async (
  setOrderLines: SetAsyncState<Record<string, Line>>,
  item: ProductVariant,
  operation: (prevQuantity: number) => number = (quantity) => quantity + 1
) => {
  const updatedValue = await setOrderLines((prevLines) => {
    const prevItem = prevLines[item.id] ?? ({ quantity: 0, productVariant: { ...item } } as Line);

    const quantity = operation(prevItem?.quantity ?? 0);
    prevItem.quantity = quantity <= 0 ? 0 : quantity;

    return { ...prevLines, [item.id]: prevItem };
  });

  return updatedValue[item.id];
};

export const useProductOrderHandler = (item: ProductVariant) => {
  const { onAdjustProductVariantInOrder, refetchOrder, setOrderLines, setActiveOrder, setRunningOrderMutationIds } =
    useOrderAction();
  const { isEligible, showOutOfStockModal } = useGuard();

  const debouncedAdjust = useCallback(
    debounce(async (prevValue: Line) => {
      const quantity = prevValue.quantity;

      let response: {
        data: Order | null;
        message: MessageStatus;
      } = { data: null, message: MessageStatus.SUCCESS };

      response = await onAdjustProductVariantInOrder({
        productVariantId: prevValue?.productVariant.id ?? '',
        quantity,
      });

      if (showOutOfStockModal(response.message)) {
        setRunningOrderMutationIds((ids) => [...ids.filter((p) => p !== item.id)]);
        return refetchOrder();
      }

      if (response.data === null) {
        setRunningOrderMutationIds((ids) => [...ids.filter((p) => p !== item.id)]);
        return;
      }

      if (response.message === MessageStatus.ERROR) {
        setRunningOrderMutationIds((ids) => [...ids.filter((p) => p !== item.id)]);
        return refetchOrder();
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { lines, customFields, ...rest } = response.data;

      setActiveOrder((prevOrder) => {
        if (!prevOrder) {
          return rest as Order;
        }

        const updatedOrderCustomFields = { ...prevOrder.customFields, ...customFields };
        return { ...prevOrder, ...rest, customFields: updatedOrderCustomFields };
      });

      setRunningOrderMutationIds((ids) => [...ids.filter((p) => p !== item.id)]);
    }, 500),
    []
  );

  const onRemovePress = useCallback(async () => {
    if (isEligible(item)) {
      const prevValue = await updateItem(setOrderLines, item, (quantity) => quantity - 1);
      setRunningOrderMutationIds((ids) => [...ids.filter((p) => p !== item.id), item.id]);

      void debouncedAdjust(prevValue);
    }
  }, [isEligible]);

  const onAddPress = useCallback(async () => {
    if (isEligible(item)) {
      const prevValue = await updateItem(setOrderLines, item);
      setRunningOrderMutationIds((ids) => [...ids.filter((p) => p !== item.id), item.id]);

      void debouncedAdjust(prevValue);
    }
  }, [isEligible]);

  return useMemo(() => {
    return { onAddPress, onRemovePress };
  }, [onAddPress, onRemovePress]);
};
