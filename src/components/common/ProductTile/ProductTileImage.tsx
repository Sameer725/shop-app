import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import theme from '@assets/theme/theme';
import { ProductFacetCode } from '@constants';
import { FacetValue } from '@types';
import { Badge } from '../Badge';
import { Box } from '../Box';

export enum ProductTileType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

interface ProductTileImageProps {
  facetValues: FacetValue[];
  discount: number;
  preview?: string;
  type: ProductTileType;
}

export const ProductTileImage = (props: ProductTileImageProps) => {
  const { facetValues, preview, discount, type } = props;
  const tag = facetValues?.find((facetValue) => facetValue.facet?.code === ProductFacetCode.PRODUCT_TAG)?.name;

  const getStyle = () => {
    switch (type) {
      case ProductTileType.VERTICAL:
        return styles.containerVertical;
      case ProductTileType.HORIZONTAL:
        return styles.containerHorizontal;
    }
  };

  return (
    <Box alignItems="center" style={getStyle()}>
      <FastImage style={styles.image} resizeMode="contain" source={{ uri: preview ?? undefined }} />
      <Box alignSelf="flex-start" justifyContent="center" alignItems="flex-end" position="absolute" right={0}>
        {tag ? <Badge marginBottom="s1">{tag}</Badge> : null}
        {discount ? (
          <Badge color="error500" fontColor="white">
            -{discount} %
          </Badge>
        ) : null}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  containerVertical: {
    width: '100%',
  },
  containerHorizontal: {
    maxWidth: 100,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: theme.radii.md,
  },
});
