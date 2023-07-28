import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { Box, ProductTileList, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { GET_RANDOM_COLLECTION_PRODUCT_VARIANTS } from '@graphqlDocuments';
import {
  ProductVariant,
  RandomCollectionProductVariantsQuery,
  RandomCollectionProductVariantsQueryVariables,
} from '@types';

interface Props {
  collectionId: string;
}

export const SimilarProducts: React.FC<Props> = (props) => {
  const { collectionId } = props;
  const { strings } = useLocalizedData();
  const [list, setList] = useState<ProductVariant[]>([]);

  const [getSimilarProducts, { loading: isLoading }] = useLazyQuery<
    RandomCollectionProductVariantsQuery,
    RandomCollectionProductVariantsQueryVariables
  >(GET_RANDOM_COLLECTION_PRODUCT_VARIANTS, {
    variables: {
      options: {
        collectionId,
        queryOptions: {
          take: 6,
        },
      },
    },
    fetchPolicy: 'no-cache',
    onCompleted: ({ randomCollectionProductVariants }) => {
      setList(randomCollectionProductVariants as ProductVariant[]);
    },
  });

  useEffect(() => {
    void getSimilarProducts();
  }, []);

  return (
    <Box marginTop="s8">
      <Text variant="heading-md" marginHorizontal="s3">
        {strings.product.youMightAlsoLike}
      </Text>
      <ProductTileList isLoading={isLoading} items={list} />
    </Box>
  );
};
