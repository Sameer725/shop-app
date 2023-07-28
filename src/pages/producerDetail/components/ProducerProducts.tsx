import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import theme from '@assets/theme/theme';
import { Box, HorizontalTileSkeleton, MemoizedProductTileVertical } from '@components';
import { useOrderLines } from '@contexts';
import { GET_PRODUCER_PRODUCT_VARIANTS } from '@graphqlDocuments/producer.graphql';
import { ProducersProductVariants, ProductVariant } from '@types';

interface ProducerProductsProps {
  producerId: string;
}

const TAKE = 6;

const renderLoader = () => (
  <Box flex={1} justifyContent="center">
    <ActivityIndicator size={theme.spacing.s10} color={theme.colors.gray300} />
  </Box>
);

const renderProductSkeletons = () => (
  <Box flex={1} flexDirection="row" flexWrap="wrap" marginLeft="s3">
    <HorizontalTileSkeleton height={210} />
  </Box>
);

const keyExtractor = (variant: ProductVariant, index: number) => `variant-${variant?.id ?? ''}-${index}`;

const ProducerProductsList = (props: ProducerProductsProps) => {
  const { producerId } = props;
  const [isFirstBatchFetched, setIsFirstBatchFetched] = useState<boolean>(false);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const { getCount } = useOrderLines();

  const {
    data: productVariants,
    fetchMore,
    loading: isLoading,
    variables,
  } = useQuery<ProducersProductVariants.Query, ProducersProductVariants.Variables>(GET_PRODUCER_PRODUCT_VARIANTS, {
    variables: {
      id: producerId,
      options: { take: TAKE },
    },
    onCompleted: () => {
      setIsFirstBatchFetched(true);
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setVariants((productVariants?.producersProductVariants.items as ProductVariant[]) ?? []);
  }, [productVariants]);

  const loadMore = async () => {
    if (productVariants?.producersProductVariants.totalItems === variants.length) {
      setEndReached(true);
      return;
    }

    const { data: newData } = await fetchMore({
      variables: {
        options: { ...variables?.options, skip: variants.length },
      },
    });

    setVariants([...variants, ...((newData?.producersProductVariants?.items as ProductVariant[]) ?? [])]);
  };

  const renderItem = ({ item: variant }: ListRenderItemInfo<ProductVariant>) => {
    return (
      <Box flex={1} marginBottom="s5" paddingRight="s3" maxWidth="33.33%">
        <MemoizedProductTileVertical item={variant} orderedQuantity={getCount(variant)} />
      </Box>
    );
  };

  return (
    <Box flex={1} marginTop="s8" marginBottom="s3">
      {isFirstBatchFetched ? null : renderProductSkeletons()}
      {variants.length ? (
        <Animated.FlatList
          data={variants}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.listContainer}
          ListFooterComponent={isFirstBatchFetched && isLoading && !endReached ? renderLoader() : null}
          onEndReached={loadMore}
          onMomentumScrollBegin={loadMore}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
        />
      ) : null}
    </Box>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginLeft: theme.spacing.s3,
  },
});

export const ProducerProducts = React.memo(ProducerProductsList);
