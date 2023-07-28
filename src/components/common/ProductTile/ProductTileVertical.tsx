import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isEqual } from 'lodash';
import React from 'react';
import { Pressable } from 'react-native';

import theme from '@assets/theme/theme';
import { CommonScreens } from '@routes/routes';
import { Box } from '../Box';
import { ProductOrderButton } from '../ProductOrder';
import { ShadowBox } from '../ShadowBox';
import { BaseProductTileProps } from './ProductTileHorizontal';
import { ProductTileImage, ProductTileType } from './ProductTileImage';
import { ProductTileInfo } from './ProductTileInfo';

const VerticalProductTile = (props: BaseProductTileProps) => {
  const { item, orderedQuantity } = props;

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const navigateToDetails = () => {
    navigation.navigate(CommonScreens.PRODUCT_DETAILS_SCREEN, { productVariantId: item.id });
  };

  return (
    <ShadowBox backgroundColor="white" borderRadius={theme.radii.xl} padding="s2">
      <Pressable onPress={navigateToDetails}>
        <ProductTileInfo
          name={String(item?.displayName)}
          priceWithTax={item?.priceWithTax}
          displayDeposit={String(item?.displayDeposit ?? '')}
          discountPercentage={Number(item?.discountPercentage ?? 0)}
          pricePerUnit={String(item?.pricePerUnit ?? '')}
          height={74}
        />
        <ProductTileImage
          facetValues={item?.product?.facetValues}
          discount={item?.discountPercentage ?? 0}
          preview={
            item?.featuredAsset?.preview || item?.product?.featuredAsset?.preview
              ? `${String(item?.featuredAsset?.preview ?? item?.product?.featuredAsset?.preview)}?preset=small`
              : undefined
          }
          type={ProductTileType.VERTICAL}
        />
      </Pressable>

      <Box position="relative" style={{ marginTop: -theme.spacing.s4 }} alignItems="flex-end">
        <ProductOrderButton
          count={orderedQuantity ?? 0}
          item={item}
          disabledWidth="100%"
          maxWidth={100}
          isWidthPercentage
        />
      </Box>
    </ShadowBox>
  );
};

export const MemoizedProductTileVertical = React.memo(VerticalProductTile, (prevProps, nextProps) => {
  if (!isEqual(prevProps.item, nextProps.item) || prevProps.orderedQuantity !== nextProps.orderedQuantity) {
    return false;
  }

  return true;
});
