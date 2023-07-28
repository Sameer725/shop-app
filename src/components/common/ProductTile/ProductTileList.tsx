import React from 'react';

import { useOrderLines } from '@contexts';
import { ProductVariant, ProductVariantDocument } from '@types';
import { Box } from '../Box';
import { HorizontalTileSkeleton } from '../HorizontalTileSkeleton';
import { MemoizedProductTileVertical } from './ProductTileVertical';

interface Props {
  items: ProductVariant[] | ProductVariantDocument[];
  isLoading?: boolean;
}

export const ProductTileList: React.FC<Props> = (props) => {
  const { isLoading = false, items } = props;
  const { getCount } = useOrderLines();

  return (
    <>
      {isLoading ? (
        <Box flex={1} flexDirection="row" flexWrap="wrap" justifyContent="center" marginLeft="s3" marginTop="s5">
          <HorizontalTileSkeleton height={210} />
        </Box>
      ) : (
        <Box flex={1} flexDirection="row" flexWrap="wrap" marginLeft="s3" paddingBottom="s3">
          {items?.map((item, index) => (
            <Box key={index} paddingRight="s3" width="33.33%" marginTop="s5">
              <MemoizedProductTileVertical
                item={item as ProductVariant}
                orderedQuantity={getCount(item as ProductVariant)}
              />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
