import React, { useCallback, useEffect, useState } from 'react';

import { useGlobalSettings, useOrderAction, useOrderLines, useOrderState } from '@contexts';
import { OrderLine } from '@types';
import { useAdjustOrderLineModal } from './AdjustOrderLineModal';
import { useAdjustOrderModal } from './AdjustOrderModal';
import { useRemoveOrderModal } from './RemoveOrderModal';

export const OrderModificationModals = () => {
  const { activeOrder } = useOrderState();
  const { lines, lineKeys } = useOrderLines();
  const { onAdjustOrderItem, onAdjustOrderItems, refetchOrder } = useOrderAction();
  const [adjustedOrderLines, setAdjustedOrderLines] = useState<OrderLine[]>([]);
  const { isFreshProductStockRelevant } = useGlobalSettings();

  const { RemoveOrderModal, showModal: showRemoveOrderModal } = useRemoveOrderModal({
    uri:
      adjustedOrderLines[0]?.productVariant?.product?.featuredAsset?.preview ||
      adjustedOrderLines[0]?.productVariant.featuredAsset?.preview
        ? `${String(
            adjustedOrderLines[0]?.productVariant.featuredAsset?.preview ??
              adjustedOrderLines[0]?.productVariant?.product?.featuredAsset?.preview
          )}?preset=small`
        : '',
    displayName: adjustedOrderLines[0]?.productVariant?.displayName ?? '',
    onPress: async () => {
      await onAdjustOrderItem({
        orderLineId: adjustedOrderLines[0]?.id,
        quantity: 0,
      });
      void refetchOrder();
    },
  });

  const { AdjustOrderModal, showModal: showAdjustOrderModal } = useAdjustOrderModal({
    displayName: adjustedOrderLines[0]?.productVariant?.displayName ?? '',
    stock: adjustedOrderLines[0]?.productVariant.stock as number,
    quantity: adjustedOrderLines[0]?.quantity,
    uri:
      adjustedOrderLines[0]?.productVariant?.product?.featuredAsset?.preview ||
      adjustedOrderLines[0]?.productVariant.featuredAsset?.preview
        ? `${String(
            adjustedOrderLines[0]?.productVariant.featuredAsset?.preview ??
              adjustedOrderLines[0]?.productVariant?.product?.featuredAsset?.preview
          )}?preset=small`
        : '',
    onPress: async () => {
      await onAdjustOrderItem({
        orderLineId: adjustedOrderLines[0]?.id,
        quantity: adjustedOrderLines[0]?.productVariant.stock as number,
      });
      void refetchOrder();
    },
  });

  const { AdjustOrderLineModal, showModal: showAdjustOrderLineModal } = useAdjustOrderLineModal({
    onPress: async () => {
      await onAdjustOrderItems(
        adjustedOrderLines.map((element) => {
          return {
            orderLineId: element.id,
            quantity: element.productVariant.stock === 0 ? 0 : (element.productVariant.stock as number),
          };
        })
      );
      void refetchOrder();
    },
  });

  const adjustOrder = useCallback(() => {
    const results = lineKeys
      .filter((key) => {
        const element = lines[key];
        if (!element?.productVariant.product) {
          return false;
        }
        // Display disabled button if is no freshProduct and Out Of Stock
        // Or if isFreshproduct and delivered before freshProductRestockTime
        const isFreshProduct = element?.productVariant.product?.customFields?.isFreshProduct;

        const isDisabled =
          (Object.prototype.hasOwnProperty.call(element?.productVariant, 'enabled') &&
            !element?.productVariant.enabled) ||
          (Object.prototype.hasOwnProperty.call(element?.productVariant.product, 'enabled') &&
            !element?.productVariant.product?.enabled);
        const isDeleted = !!element?.productVariant.deletedAt || !!element?.productVariant.product?.deletedAt;

        return (
          isDisabled ||
          isDeleted ||
          ((isFreshProduct && isFreshProductStockRelevant) || !isFreshProduct
            ? element.quantity > (element.productVariant?.stock as number)
            : false)
        );
      })
      .map((key) => lines[key]);

    setAdjustedOrderLines(results);

    if (!results?.length) {
      return;
    }
    if (results.length === 1) {
      if (
        results[0].productVariant.stock! <= 0 ||
        !results[0].productVariant.enabled ||
        !!results[0].productVariant.deletedAt ||
        !results[0].productVariant.product?.enabled ||
        !!results[0].productVariant.product?.deletedAt
      ) {
        // If no stock is available remove the order
        showRemoveOrderModal();
      } else {
        // If stock is lesser than desired quantity adjust quantity equal to stock
        showAdjustOrderModal();
      }
    } else {
      // If more than one product is out of stock or quantity is lesser than stock or both adjust all to stock
      showAdjustOrderLineModal();
    }
  }, [activeOrder]);

  useEffect(() => {
    if (activeOrder) {
      void adjustOrder();
    }
  }, [activeOrder]);

  return (
    <>
      <RemoveOrderModal />
      <AdjustOrderModal />
      <AdjustOrderLineModal />
    </>
  );
};
