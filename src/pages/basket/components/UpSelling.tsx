import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';

import { Box, ProductTileList, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { GET_UPSELLING_PRODUCTS } from '@graphqlDocuments';
import { ProductVariant, UpSellingProductVariantsQuery, UpSellingProductVariantsQueryVariables } from '@types';

const TAKE = 6;

export const UpSelling = () => {
  const { strings } = useLocalizedData();

  const [getUpSellingProducts, { data, loading: isLoading }] = useLazyQuery<
    UpSellingProductVariantsQuery,
    UpSellingProductVariantsQueryVariables
  >(GET_UPSELLING_PRODUCTS, {
    variables: { options: { take: TAKE } },
  });

  useEffect(() => {
    void getUpSellingProducts();
  }, []);

  return (
    <Box marginTop="s3" marginBottom="s5">
      <Text marginLeft="s3" variant="heading-sm">
        {strings.basket.upSelling}
      </Text>
      <ProductTileList isLoading={isLoading} items={data?.upSellingProductVariants?.items as ProductVariant[]} />
    </Box>
  );
};
