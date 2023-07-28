import React from 'react';
import Animated, { FadeOut, Layout } from 'react-native-reanimated';

import theme from '@assets/theme/theme';
import { Box } from '../Box';
import {
  AddressCardSkeleton,
  AddressSkeleton,
  ButtonSkeleton,
  HeaderImageSkeleton,
  IngredientsSkeleton,
  PreparationSkeleton,
  ProducerDetailsSkeleton,
  ProductDetailsSkeleton,
  ProductPriceSkeleton,
  ProductsSkeleton,
  ProductsWithHeadingSkeleton,
  TagsSkeleton,
  TitleSkeleton,
} from './DetailsScreenSkeletonComponents';

export enum DetailsScreenSkeletonType {
  PRODUCER_DETAILS = 'producerDetails',
  PRODUCT_DETAILS = 'productDetails',
  RECIPE_DETAILS = 'recipeDetails',
}

// All possible skeleton components of the detail screens
const SkeletonComponents = {
  // Producer specific
  address: <AddressSkeleton />,
  producerDetails: <ProducerDetailsSkeleton />,

  // Recipe specific
  recipeTags: <TagsSkeleton />,
  ingredients: <IngredientsSkeleton />,
  preparation: <PreparationSkeleton />,

  // Product specific
  productPrice: <ProductPriceSkeleton />,
  productDetails: <ProductDetailsSkeleton />,
  addressCard: <AddressCardSkeleton />,

  // General
  button: <ButtonSkeleton />,
  products: <ProductsSkeleton />,
  productsWithHeader: <ProductsWithHeadingSkeleton />,
};

const producerDetailScreen = [
  SkeletonComponents.button,
  SkeletonComponents.productDetails,
  SkeletonComponents.addressCard,
];

const productDetailScreen = [
  SkeletonComponents.productPrice,
  SkeletonComponents.button,
  SkeletonComponents.productDetails,
  SkeletonComponents.addressCard,
  SkeletonComponents.productsWithHeader,
];

const recipeDetailScreen = [
  SkeletonComponents.recipeTags,
  SkeletonComponents.button,
  SkeletonComponents.products,
  SkeletonComponents.ingredients,
  SkeletonComponents.preparation,
];

const displayComponents = {
  producerDetails: producerDetailScreen,
  productDetails: productDetailScreen,
  recipeDetails: recipeDetailScreen,
};

interface Props {
  type: DetailsScreenSkeletonType;
}

export const DetailsScreenSkeleton: React.FC<Props> = (props) => {
  const { type } = props;

  return (
    <Animated.ScrollView
      exiting={FadeOut.duration(250)}
      layout={Layout.springify()}
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <Box marginBottom="s8">
        <HeaderImageSkeleton />
        <TitleSkeleton />

        {displayComponents[type].map((component, index) => (
          <Box key={index}>{component}</Box>
        ))}
      </Box>
    </Animated.ScrollView>
  );
};
