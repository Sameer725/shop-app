import { useLazyQuery } from '@apollo/client';
import { isEqual } from 'lodash';
import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated';

import theme from '@assets/theme/theme';
import { Box, MemoizedProductTileVertical, ShadowBox, Text } from '@components';
import { CollectionDataSection, useLocalizedData, useOrderLines } from '@contexts';
import { GET_COLLECTION_REMAINING_CONTENTS } from '@graphqlDocuments';
import { GetCollectionContentsQuery, GetCollectionContentsQueryVariables, ProductVariant } from '@types';

interface Props {
  collectionSection: CollectionDataSection;
  activeIndices: Animated.SharedValue<true[]>;
  index: number;
}

export const CollectionSection: React.FC<Props> = (props) => {
  const { collectionSection, index, activeIndices } = props;
  const { strings } = useLocalizedData();
  const { getCount } = useOrderLines();
  const isActive = useDerivedValue(() => {
    return activeIndices.value[index] ?? false;
  }, [index]);

  const [getCollectionContent, { data: extendedCollectionData }] = useLazyQuery<
    GetCollectionContentsQuery,
    GetCollectionContentsQueryVariables
  >(GET_COLLECTION_REMAINING_CONTENTS);

  const fetchData = useCallback(async () => {
    if (collectionSection.id) {
      await getCollectionContent({ variables: { id: collectionSection.id ?? '' } });
    }
  }, [collectionSection.id]);

  useAnimatedReaction(
    () => isActive.value,
    (value) => {
      if (value) {
        runOnJS(fetchData)();
      }
    },
    []
  );

  const windowSize = collectionSection.data.length > 50 ? collectionSection.data.length / 4 : 21;
  const keyExtractor = (item: ProductVariant) => `collection-product-${item.id}`;

  const NoItem = () => {
    return (
      <Box marginRight="s3" marginBottom="s3">
        <ShadowBox backgroundColor="white" borderRadius={theme.radii.xl} padding="s6">
          <Text
            textAlign="center"
            variant="text-sm"
            color="textColorPlaceholder"
            lineBreakMode="middle"
            textBreakStrategy="balanced"
          >
            {strings.dashboard.nothingOnShelf}
          </Text>
        </ShadowBox>
      </Box>
    );
  };

  const renderProductVariant = ({ item: productVariant }: ListRenderItemInfo<ProductVariant>) => {
    const newData = extendedCollectionData?.collection?.productVariants?.items?.find(
      (item) => item.id === productVariant.id
    );

    const item = newData ? { ...(newData as ProductVariant), ...productVariant } : productVariant;
    const count = getCount(item);

    return (
      <Box flex={1} marginBottom="s5" paddingRight="s3" maxWidth="33.33%">
        <MemoizedProductTileVertical orderedQuantity={count} item={item} />
      </Box>
    );
  };

  return (
    <>
      <Text variant="heading-sm" marginVertical="s5" style={{ backgroundColor: theme.colors.background }}>
        {collectionSection.title}
      </Text>
      {collectionSection.data.length > 0 ? (
        <FlatList
          data={collectionSection.data}
          renderItem={renderProductVariant}
          numColumns={3}
          windowSize={windowSize}
          initialNumToRender={windowSize}
          maxToRenderPerBatch={windowSize}
          updateCellsBatchingPeriod={windowSize}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      ) : (
        <NoItem />
      )}
    </>
  );
};

export const MemoizedCollectionSection = React.memo(CollectionSection, (prevProps, nextProps) =>
  isEqual(prevProps.collectionSection.data, nextProps.collectionSection.data)
);
