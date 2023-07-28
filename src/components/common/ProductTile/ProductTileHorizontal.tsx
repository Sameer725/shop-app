import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isEqual } from 'lodash';
import React from 'react';
import { Pressable } from 'react-native';

import { CommonScreens, Tabs } from '@routes/routes';
import { ProductVariant } from '@types';
import { Box } from '../Box';
import { ProductOrderButton } from '../ProductOrder';
import { ProductTileImage, ProductTileType } from './ProductTileImage';
import { ProductTileInfo } from './ProductTileInfo';

export interface BaseProductTileProps {
  item: ProductVariant;
  orderedQuantity?: number;
}

const HorizontalProductTile = (props: BaseProductTileProps) => {
  const { item, orderedQuantity } = props;

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const navigateToDetails = () => {
    navigation.navigate(Tabs.DASHBOARD, {
      screen: CommonScreens.PRODUCT_DETAILS_SCREEN,
      initial: false,
      params: { productVariantId: item.id },
    });
  };

  return (
    <Box flexDirection="row" alignItems="center">
      <Pressable onPress={navigateToDetails}>
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
      </Pressable>

      <Box marginHorizontal="s4" flex={1}>
        <Pressable onPress={navigateToDetails}>
          <ProductTileInfo
            name={String(item?.displayName)}
            priceWithTax={item?.priceWithTax}
            displayDeposit={String(item?.displayDeposit ?? '')}
            discountPercentage={Number(item?.discountPercentage ?? 0)}
            pricePerUnit={String(item?.pricePerUnit ?? '')}
          />
        </Pressable>
      </Box>
      <ProductOrderButton item={item} count={orderedQuantity} />
    </Box>
  );
};

export const MemoizedProductTileHorizontal = React.memo(HorizontalProductTile, (prevProps, nextProps) => {
  if (!isEqual(prevProps.item, nextProps.item) || prevProps.orderedQuantity !== nextProps.orderedQuantity) {
    return false;
  }

  return true;
});
