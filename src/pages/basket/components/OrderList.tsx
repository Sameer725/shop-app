import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, MemoizedProductTileHorizontal, ShadowBox } from '@components';
import { useOrderLines } from '@contexts';
import { OrderModificationModals } from './orderModificationModals';

const ItemSeparator = () => {
  return <Box height={1} marginVertical="s2" backgroundColor="gray100" />;
};

export const OrderList = () => {
  const { lines, lineKeys } = useOrderLines();

  const renderOrderItem = ({ item: key }: ListRenderItemInfo<string>) => {
    const item = lines[key];
    return <MemoizedProductTileHorizontal item={item.productVariant} orderedQuantity={item.quantity} />;
  };

  const keyExtractor = useCallback((item: string, index: number) => `order-${item}-${index}`, []);

  return (
    <ShadowBox borderRadius={theme.radii['2xl']} padding="s3">
      <FlatList
        data={lineKeys}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={keyExtractor}
        renderItem={renderOrderItem}
        showsVerticalScrollIndicator={false}
      />
      <OrderModificationModals />
    </ShadowBox>
  );
};
