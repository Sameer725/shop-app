import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
  CollectionSkeleton,
  ProducersSkeleton,
  RecipesSkeleton,
  TopTabNavigation,
  TopTabNavigationItem,
} from '@components';
import { ReservedCollectionSlugs } from '@constants';
import { GET_COLLECTION_LIST } from '@graphqlDocuments';
import { ProducerListScreen, RecipeScreen } from '@pages';
import { MemoizedCollectionScreen } from '@pages/collection/CollectionScreen';
import { Collection, KsRoute, RootCollectionsQuery } from '@types';

interface CollectionRouteParams {
  collectionName?: string;
}

const Navigation = () => {
  const route = useRoute<KsRoute<CollectionRouteParams>>();

  const { data } = useQuery<RootCollectionsQuery>(GET_COLLECTION_LIST);
  const [tabData, setTabData] = useState<(Collection | TopTabNavigationItem)[]>();

  useEffect(() => {
    const listData =
      // Filter collections with name Regionales and Rezepte since they are handled separate
      data?.rootCollections?.items.filter(
        (item) =>
          item.slug !== ReservedCollectionSlugs.PRODUCER &&
          item.slug !== ReservedCollectionSlugs.RECIPE &&
          item.slug !== ReservedCollectionSlugs.FAVORITES
      ) as Collection[];

    const screens = [
      {
        id: 'producers',
        name: 'Regionales',
        screen: ProducerListScreen,
        placeholder: ProducersSkeleton,
      } as TopTabNavigationItem,
      { id: 'recipes', name: 'Rezepte', screen: RecipeScreen, placeholder: RecipesSkeleton } as TopTabNavigationItem,
      ...listData,
    ];

    setTabData(screens);
  }, [data]);

  return (
    <>
      {tabData ? (
        <TopTabNavigation
          data={tabData}
          initialRouteName={route?.params?.collectionName ?? tabData?.[0]?.name}
          defaultScreen={MemoizedCollectionScreen}
          defaultPlaceHolder={CollectionSkeleton}
        />
      ) : null}
    </>
  );
};

export const CollectionTopTabNavigator = React.memo(Navigation);
