import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React from 'react';

import { DetailsScreenSkeleton, DetailsScreenSkeletonType, ScreenWrapper } from '@components';
import { GET_PRODUCT_VARIANT } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { KsRoute, ProductVariantQuery, ProductVariantQueryVariables } from '@types';
import { ProductDetailsContent } from './components/ProductDetailsContent';

interface ProductDetailParam {
  productVariantId: string;
}

export const ProductDetailsScreen: React.FC = () => {
  const route: KsRoute<ProductDetailParam> = useRoute();
  const { showGeneralErrorToast } = useToastNotification();

  const { data: productDetails, loading: isLoading } = useQuery<ProductVariantQuery, ProductVariantQueryVariables>(
    GET_PRODUCT_VARIANT,
    {
      variables: { id: route.params?.productVariantId },
      onError: () => {
        showGeneralErrorToast();
      },
    }
  );

  return (
    <ScreenWrapper>
      {isLoading ? (
        <DetailsScreenSkeleton type={DetailsScreenSkeletonType.PRODUCT_DETAILS} />
      ) : (
        <ProductDetailsContent productDetails={productDetails as ProductVariantQuery} />
      )}
    </ScreenWrapper>
  );
};
