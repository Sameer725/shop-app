import { isEqual } from 'lodash';
import React from 'react';

import theme from '@assets/theme/theme';
import { Box } from '../Box';
import { Text } from '../Text';
import { BaseProductTileProps } from './ProductTileHorizontal';
import { ProductTileImage, ProductTileType } from './ProductTileImage';
import { ProductTileInfo } from './ProductTileInfo';

const ReadonlyProductTile = (props: BaseProductTileProps) => {
  const { item, orderedQuantity } = props;

  return (
    <Box flex={1} flexDirection="row" alignItems="center">
      <ProductTileImage
        facetValues={item?.product?.facetValues}
        discount={item?.discountPercentage ?? 0}
        preview={
          item?.featuredAsset?.preview || item?.product?.featuredAsset?.preview
            ? `${String(item?.featuredAsset?.preview ?? item?.product?.featuredAsset?.preview)}?preset=small`
            : undefined
        }
        type={ProductTileType.HORIZONTAL}
      />
      <Text variant="text-md-sb" marginLeft="s4" textAlign="right" style={{ minWidth: theme.spacing.s8 }}>
        {orderedQuantity}x
      </Text>
      <Box marginHorizontal="s4" flex={1}>
        <ProductTileInfo
          name={String(item?.displayName)}
          priceWithTax={item?.priceWithTax}
          displayDeposit={String(item?.displayDeposit ?? '')}
          discountPercentage={Number(item?.discountPercentage ?? 0)}
          pricePerUnit={String(item?.pricePerUnit ?? '')}
          highlightDiscount={false}
        />
      </Box>
    </Box>
  );
};

export const MemoizedProductTileReadonly = React.memo(ReadonlyProductTile, (prevProps, nextProps) => {
  if (!isEqual(prevProps.item, nextProps.item) || prevProps.orderedQuantity !== nextProps.orderedQuantity) {
    return false;
  }

  return true;
});
