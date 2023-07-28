import { useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { TopTabNavigation } from '@components';
import { GET_FAVORITE_COLLECTIONS } from '@graphqlDocuments';
import { Collection, FavoriteCollectionsQuery } from '@types';
import { FavoritesCollectionScreen } from '../FavoritesCollectionScreen';
import { NoFavorites } from './NoFavorites';

export const Favorites = () => {
  const { data, loading } = useQuery<FavoriteCollectionsQuery>(GET_FAVORITE_COLLECTIONS);

  const listData = (data?.favoriteCollections.items as Collection[]) ?? [];

  const [prevData, setPrevData] = useState<Collection[]>([]);
  const [hasChanged, setHasChanged] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (data?.favoriteCollections) {
      const isChanged =
        data?.favoriteCollections.items.length !== prevData.length || prevData.length > 0
          ? prevData.some((item, index) => data?.favoriteCollections.items[index]?.id !== item.id)
          : false;

      setHasChanged(isChanged);

      setPrevData(data?.favoriteCollections.items as Collection[]);
    }
  }, [data, isFocused, prevData]);

  const renderFavorites = () => {
    if (!hasChanged) {
      return <TopTabNavigation data={listData} defaultScreen={FavoritesCollectionScreen} />;
    }
    return null;
  };

  const renderNoFavorites = () => {
    if (loading) {
      return null;
    }

    return <NoFavorites />;
  };

  return listData?.length > 0 ? renderFavorites() : renderNoFavorites();
};
