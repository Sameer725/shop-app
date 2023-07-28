import { useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Box, ProductTileList, Text, TopTabNavigationScreenProps } from '@components';
import { GET_FAVORITE_ITEMS } from '@graphqlDocuments';
import { Collection, FavoriteListOptions, FavoritesQuery, ProductVariant } from '@types';

export const FavoritesCollectionScreen = (props: TopTabNavigationScreenProps<Collection>) => {
  const { item } = props;
  const isFocused = useIsFocused();

  const options: FavoriteListOptions = {
    filter: { collectionId: { eq: item.id } },
  };

  const [list, setList] = React.useState<ProductVariant[]>([]);
  const { loading } = useQuery<FavoritesQuery>(GET_FAVORITE_ITEMS, {
    variables: { options },
    onCompleted: ({ favorites }) => setList(favorites.items.map((el) => el.productVariant as ProductVariant)),
    skip: !isFocused,
  });

  return (
    <Box backgroundColor="background" flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} flexGrow={1} marginBottom="s10" marginTop="s5">
          <Text variant="heading-md" paddingHorizontal="s3">
            {item.name}
          </Text>

          <ProductTileList isLoading={loading && !list.length} items={list} />
        </Box>
      </ScrollView>
    </Box>
  );
};
